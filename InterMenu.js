// import { TextToContainer } from "/static/js/TextToContainer.js"


//vraca funkciju koja ne uzima argumente ali ima assignan lineWidth i lineHeight
export function TextToContainer(lineWidth,lineHeight) {
    return function(){
      let text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      // lineHeight = 1.1, // ems
      x = text.attr("x"),
      y = text.attr("y"),
      dy = 1.1,
      tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > lineWidth) { 
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
      }
      // console.log(d3.select(this)['_groups'][0][0].getBoundingClientRect())
      let offset = d3.select(this)['_groups'][0][0].getBoundingClientRect();
      d3.select(this).attr('transform',`translate(${0},${-offset['height']/2})`);
    }
}





//++++++++++++++++++++++++++++++++++++++++++++++++++\\
//                    Menu                          \\
//++++++++++++++++++++++++++++++++++++++++++++++++++\\

export class InterMenu{

    constructor(group,onClick){
        this.group = group; 
        this.subGraph = null;
        this.hasSubGraf = false;
        // this.opisElem = opisElem;
        // this.opisHeaderElem = opisHeaderElem;
        this.onClick = onClick;
        this.data = null;
        this.path = null;
    }

    SetContainerStyle(style){ this.style = style; return this;  } // container && path style

    Populate(data){    // data format : array of string
        console.log('TU Sam')
        //init
        this.Clear();
        this.data = data;
        this.MakePath();
        console.log(this.path)
        let selection = this.group.selectAll().data(data);

        selection.enter()
            .append('g')
            // .on('click', BindGraphClickEvent(this))
            .attr('transform',(d,i) => { return `translate( ${ this.path[i][0] },${ this.path[i][1] })`});;

        let groups =  this.group.selectAll('g');

        groups.append('circle')
            .attr('r',20)
            // .attr('fill',this.style.Cfill)
            .attr('stroke','green')
            .attr('cx', 0)
            .attr('cy', 0);
        // if(this.style.Ctype == 'circle'){
        //     this.groups.append('circle')
        //         .attr('r',20)
        //         .attr('fill',this.style.Cfill)
        //         .attr('stroke',this.style.Cstroke)
        //         .attr('cx', 0)
        //         .attr('cy', 0);
        // }
        // else if( this.style.Ctype == 'rect'){
        //     groups.append('rect')
        //         .attr('fill',this.style.Cfill)
        //         .attr('stroke',this.style.Cstroke)
        //         .attr('width',this.style.Cwidth)
        //         .attr('height',this.style.Cheight)
        //         .attr('x', -this.style.Cwidth/2)
        //         .attr('y', -this.style.Cheight/2);
        // }
    
        groups.append('text')
            .attr("x", 0)
            .attr("y",  0)
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .style("font-size", '1en')
            .text(d => d)
            .each(TextToContainer(40-5,1.4));   
    
        return this;    
    }

    Clear(){
        if(this.hasSubGraf) this.ClearSubGraph();
        // this.opisElem.html('');
        this.group.selectAll('g').remove();
        return this; }
    
    ClearSubGraph(){ this.subGraph.Clear(); return this;}
    
    
    SetSubGraph(sub){this.hasSubGraf=true; this.subGraph = sub;  return this; }


    async PopulateSubGraph(withDataID){
        let data = await this.DataSourceFun(withDataID);
        // this.opisHeaderElem.html(withDataID)
        this.subGraph.Populate(data);
    }


    MakePath(){
        if( true) this.path = SplitArc(this.data.length,40,41);
        else if(false) this.path = SplitLineX(this.data.length,this.style.Plen);
        else if( false) this.path = SplitLineY(this.data.length,this.style.Plen);
        // if( this.style.Ptype == 'arc') this.path = SplitArc(this.data.length,this.style.Prad,this.style.Prad+1);
        // else if( this.style.Ptype == 'linX') this.path = SplitLineX(this.data.length,this.style.Plen);
        // else if( this.style.Ptype == 'linY') this.path = SplitLineY(this.data.length,this.style.Plen);
    }

}



//++++++++++++++++++++++++++++++++++++++++++++++++++\\
//                Elem Path                         \\
//++++++++++++++++++++++++++++++++++++++++++++++++++\\

// export function GraphDataFormat(text,path){ 
//     let data = []; 
//     text.map((el,i) => { data.push({'data':el,'coord':[path[i][0],path[i][1]] })});
//     return data;
// }

//n - number of sections
function SplitArc(n,radius){
    let arr = [];
    for(let x = 0; x<n;x++) {
        arr.push(
            d3.arc()
                .innerRadius(radius)
                .outerRadius(radius+1)
                .startAngle( x * 2 * Math.PI /n ) 
                .endAngle( (x+1) * 2 * Math.PI /n )
        );
    }
    return arr.map(el => el.centroid());
}


function SplitLineX(n,len){
    let arr = Array.from(Array(n).keys());
    const step = len/n;
    arr = arr.map((el,i)=>{ return [ i*step , 0]; });
    // console.log(arr)
    return arr;
}

function SplitLineY(n,len){
    let arr = Array.from(Array(n).keys());
    const step = len/n;
    arr = arr.map((el,i)=>{ return [ 0 , i*step]; });
    return arr;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++\\
//                    Click                         \\
//++++++++++++++++++++++++++++++++++++++++++++++++++\\

function BindGraphClickEvent(graph){
    return function GraphClick(data){
        const parentG = d3.select(this.parentNode);  
        let isClicked = IsClicked(parentG); //dali je vec kliknut
        let LastNodeClickedID = parentG.attr('NodeClickedID');

        if(isClicked && LastNodeClickedID == data['data']) { //ako je opet klkunt isti
            parentG.selectAll('g')
                .transition()
                    // .attr("transform",d=> `translate(${d['coord'][0]},${d['coord'][1]})scale(1)`)
                    .style("opacity", 1)
                    .duration(500);  

            if(graph.hasSubGraf)graph.ClearSubGraph();
            graph.opisHeaderElem.html('')

            parentG.attr('isClicked',null);
            // console.log('vec klikunt isti')
        }
        else if(isClicked && LastNodeClickedID != data['data'] ){ //ako ClickID nije jednak a kliknulo se
                parentG.selectAll('g')
                    .transition()
                        // .attr("transform",d=> `translate(${d['coord'][0]},${d['coord'][1]})scale(1)`)
                        .style("opacity", 1)
                        // .duration(500);
                parentG.selectAll('g').filter(d=>d!=data)
                    .transition()
                        // .attr("transform",`translate(${data['coord'][0]},${data['coord'][1]})scale(0)`)
                        .style("opacity", 0.1)
                        .duration(500);  

            if(graph.hasSubGraf)graph.PopulateSubGraph(data['data']);

            parentG.attr('isClicked','');
            // console.log('vec klikunt novi')
        }
        else if(!isClicked){
            parentG.selectAll('g')
                .transition().filter(d=>d!=data)
                    // .attr("transform",d=> `translate(${d['coord'][0]},${d['coord'][1]})scale(1)`)
                    .style("opacity", 0.1)
                    .duration(500);  

            if(graph.hasSubGraf)graph.PopulateSubGraph(data['data']);

            parentG.attr('isClicked','');
            // console.log('klikunt')
        }
        parentG.attr('NodeClickedID',data['data']);
    }    
}

function IsClicked(node){
    const isClicked = node.attr('isClicked')
    if(isClicked == null) return false;
    else return true;
}


