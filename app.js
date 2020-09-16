import { InterMenu } from '/InterMenu.js'


// //++++++++++++++++++++++++++++++++++++++++++++++++++\\
// //                  Menu Style                      \\
// //++++++++++++++++++++++++++++++++++++++++++++++++++\\

// const GraphStyleRectLinY ={ // C-container , P-path
//     Ctype : 'rect',
//     Cfill : 'white',
//     Cstroke : 'black',
//     Cwidth : width/(MAX_CONTAINERSx +1) ,
//     Cheight : height/MAX_CONTAINERSy -30,

//     Ptype : 'linY',
//     Plen : height - height*0.1,

//     fontSize : `100%` 
// };

// const GraphStyleRectLinX ={ // C-container , P-path
//     Ctype : 'rect',
//     Cfill : 'white',
//     Cstroke : 'black',
//     Cwidth : 100,
//     Cheight : 170,

//     Ptype : 'linX',
//     Plen : width - width*0.1,

//     fontSize : "1em"
// };

// const GraphStyleCircArc ={
//     Ctype : 'circle',
//     Cfill : 'none',
//     Cstroke : 'green',
//     Cr : 50,

//     Ptype : 'Arc',
//     Prad : 200,

//     fontSize : "1em"
// };
// // //////////////////////////////////////////////////


// //++++++++++++++++++++++++++++++++++++++++++++++++++\\
// //                  Menu Style                      \\
// //           C - container , P - path               \\
// //++++++++++++++++++++++++++++++++++++++++++++++++++\\
const GraphStyleCircArc ={
    Ctype : 'circle',
    Cfill : 'none',
    Cstroke : 'green',
    Cr : 50,

    Ptype : 'Arc',
    Prad : 200,

    fontSize : "1em"
};


console.log('BRAVO')
function main(){
    let width = window.innerWidth/2,
    height = window.innerHeight;
    
    let svg = d3.select('.graf')
        .append('svg')
        .attr('width',width)
        .attr('height',height)
        // .attr("viewBox", "0 0 1000 600")
        // .attr('preserveAspectRatio','xMidYMid')

    let menu = svg.append('g')
    let submenu = svg.append('g')

    menu.attr("transform", `translate(${width/2},${height/2})`)

    let Menu = (new InterMenu(menu))
        // .SetContainerStyle(GraphStyle)
        // .SetupSubGraph(MODULIgraf)
        .Populate(['a','b','c','d','e','f','g']); 

};


main();


//     let width = window.innerWidth/2,
//     height = window.innerHeight;

//     //za centriranje
//     const MAX_CONTAINERSx = 4;
//     const MAX_CONTAINERSy = 7;

//     let svg = d3.select('.graf')
//         .append('svg')
//         .attr('width',width)
//         .attr('height',height)
//         // .attr('viewBox',`0 0 ${200} ${height-200}`)
//         // .attr('viewBox',`0 0 400 400`)
//         // .attr("preserveAspectRatio", "xMinYMin meet")
//         .attr("viewBox", "0 0 1000 600")
//         .attr('preserveAspectRatio','xMidYMid')
//         .call(responsify); //da bude responzivan


//     let opisElem = d3.select('.content-text');
//     let headerOpisElem = d3.select('.content-header');




//     let ipsG = svg.append('g')
//     let modsG = svg.append('g')
//     let appsG = svg.append('g')
//     let opapG = svg.append('g')
//     let zadsG = svg.append('g')


//     //grafovi
//     let IPSgraf;
//     let MODULIgraf;
//     let APLIKACIJEgraf;
//     let OPISappgraf;
//     let Zadnjigraf;

//     Zadnjigraf = (new Graph(zadsG,opisElem,width,height))
//         .SetContainerStyle(GraphStyle)

//     OPISappgraf = (new Graph(opapG,opisElem,headerOpisElem,width,height))
//         .SetContainerStyle(GraphStyle)
//         .SetInitTranslateOffsetX('topL')
//         .SetXoff( (GraphStyle.Cwidth * 3.5 + GrOffsetX * 4) )
//         // .SetYoff(-height/2+600)
//         .SetDataSource(getPISdata)
//         .SetupSubGraph(Zadnjigraf)

//     APLIKACIJEgraf = (new Graph(appsG,opisElem,headerOpisElem,width,height))
//         .SetContainerStyle(GraphStyle)
//         .SetInitTranslateOffsetX('topL')
//         .SetXoff( (GraphStyle.Cwidth * 2.5 + GrOffsetX * 3) )
//         // .SetYoff(-height/2+400)
//         .SetDataSource(getPISdata)
//         .SetupSubGraph(OPISappgraf)

//     MODULIgraf = (new Graph(modsG,opisElem,headerOpisElem,width,height))
//         .SetContainerStyle(GraphStyle)
//         .SetInitTranslateOffsetX('topL')
//         .SetXoff( (GraphStyle.Cwidth * 1.5 + GrOffsetX * 2)  )
//         // .SetYoff(-height/2+200)
//         .SetDataSource(getPISdata)
//         .SetupSubGraph(APLIKACIJEgraf)

//     IPSgraf = (new Graph(ipsG,opisElem,headerOpisElem,width,height))
//         .SetContainerStyle(GraphStyle)
//         .SetInitTranslateOffsetX('topL')
//         .SetXoff( (GraphStyle.Cwidth * 0.5 + GrOffsetX * 1) )
//         // .SetYoff(height/30)
//         .SetDataSource(getPISdata)
//         .SetupSubGraph(MODULIgraf)
//         .Populate({'data':IPS_data['data'],'opis':''}); 
//     // -width/2 jer od sredine je offset

    


