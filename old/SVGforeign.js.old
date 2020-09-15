// NE RADI KAKO TREBA


export function TextElement(d,i){
    let obj = d3
        .select(this)
        .append('foreignObject')
        .attr('class','foreignObjectWrapper')
        .attr('width', '100')
        .attr('height', '100')
        .style('display','inline-block')
        .style('margin','0')
        .style('padding','0')
        .attr('x', d['coord'][0]  )
        .attr('y', d['coord'][1] );
        
    let p = obj
        .append('xhtml:p')
            .style('display','inline-block')
            .style('margin','0')
            .style('padding','0')
            // .style('background-color','green')
            .style('font-size','10px')
            .html(d['data']+'<br>'+' A')
            .attr('color','red')    

    let offset =  d3.select(this).select('foreignObject').select('p')['_groups'][0][0].getBoundingClientRect();
    // console.log(offset) // malo ruzno izgleda ali radi
    // console.log(d3.select(this).select('.foreignObjectWrapper').enter().getBBox()) //ne radi   
    // obj.attr('transform',`translate(0,0)`);
    obj.attr('transform',`translate(${-offset['width']/2},${-offset['height']/2})`);
    // obj.attr('width','50')
    obj.attr('width',offset['width'])
    obj.attr('height',offset['height'])
}

// export function ImageElement(url,group){
// group.append('foreignObject')
//     .attr('width', '100%')
//     .attr('height', '100%')
//     .attr('x', 0) 
//     .append('xhtml:div').style('height','100%').style('width','100%')
//         .append('xhtml:object')
//             .attr('height','100%').attr('width','100%')
//             .attr('type','image/svg+xml')
//             .attr('data',url)
//             .append('img').attr('alt','notloaded');
// return group;
// }




//npr 

/*

<g transform="translate(100,100)">
    
    <circle r="50" cx="0" cy="0" fill="red" stroke="black"></circle>

    <foreignObject  width="100" height="100" x="0" y="0">
          <p style="width: 100%; font-size:.8em;  background-color: lightgreen; margin:0; padding:0">
            TE as XT dsa lorem sdakodaskd das  dasd fgr g h ty j \n kdoaskd dkd kc</p>
    </foreignObject>
</g>


*/





