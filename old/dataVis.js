import { getPISdata } from '/static/js/dataRequest.js'
import { Graph } from '/static/js/Graph.js'
import { responsify } from '/static/js/responsify.js'
//++++++++++++++++++++++++++++++++++++++++++++++++++\\
//                D3  settings & vars               \\
//++++++++++++++++++++++++++++++++++++++++++++++++++\\


    // opisElem.html('dasdasasd')
//++++++++++++++++++++++++++++++++++++++++++++++++++\\
//                     MAIN                         \\
//++++++++++++++++++++++++++++++++++++++++++++++++++\\

main()
async function main(){
    let width = window.innerWidth/2,
    height = window.innerHeight;

    //za centriranje
    const MAX_CONTAINERSx = 4;
    const MAX_CONTAINERSy = 7;

    // let chart = d3.select('#chart');
    let svg = d3.select('.graf')
        .append('svg')
        .attr('width',width)
        .attr('height',height)
        // .attr('viewBox',`0 0 ${200} ${height-200}`)
        // .attr('viewBox',`0 0 400 400`)
        // .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1000 600")
        .attr('preserveAspectRatio','xMidYMid')
        .call(responsify); //da bude responzivan


    let opisElem = d3.select('.content-text');
    let headerOpisElem = d3.select('.content-header');

    //++++++++++++++++++++++++++++++++++++++++++++++++++\\
    //                     Style                        \\
    //++++++++++++++++++++++++++++++++++++++++++++++++++\\

    const GraphStyleRectLinY ={ // C-container , P-path
        Ctype : 'rect',
        Cfill : 'white',
        Cstroke : 'black',
        Cwidth : width/(MAX_CONTAINERSx +1) ,
        Cheight : height/MAX_CONTAINERSy -30,

        Ptype : 'linY',
        Plen : height - height*0.1,

        fontSize : `100%` //${ height/MAX_CONTAINERSy/4/2}px
    };

    const GraphStyleRectLinX ={ // C-container , P-path
        Ctype : 'rect',
        Cfill : 'white',
        Cstroke : 'black',
        Cwidth : 100,
        Cheight : 170,

        Ptype : 'linX',
        Plen : width - width*0.1,

        fontSize : "1em"
    };

    const GraphStyleCircArc ={
        Ctype : 'circle',
        Cfill : 'none',
        Cstroke : 'green',
        Cr : 50,

        Ptype : 'Arc',
        Prad : 200,

        fontSize : "1em"
    };
    //////////////////////////////////////////////////

    //podaci za prvi red
    let IPS_data = (await getPISdata("IPS"));

    //grupe, boundingBox pa centrirati po Y
    let bkgG = svg.append('g')


    let ipsG = svg.append('g')
    let modsG = svg.append('g')
    let appsG = svg.append('g')
    let opapG = svg.append('g')
    let zadsG = svg.append('g')


    //grafovi
    let IPSgraf;
    let MODULIgraf;
    let APLIKACIJEgraf;
    let OPISappgraf;
    let Zadnjigraf;

    // let GraphStyle = GraphStyleRectLinX;
    let GraphStyle = GraphStyleRectLinY;
    let GrOffsetX = width / GraphStyle.Cwidth*MAX_CONTAINERSx ;

    ///////////////////////////////////////////
    // Background
    SetBkgr(bkgG, height ,GraphStyle.Cwidth , GraphStyle.Cwidth*3 +  GrOffsetX*4 ,'#D9E5D6' )
    SetBkgr(bkgG, height ,GraphStyle.Cwidth , GraphStyle.Cwidth*2 +  GrOffsetX*3 ,'#6b8794' )    
    SetBkgr(bkgG, height ,GraphStyle.Cwidth , GraphStyle.Cwidth +  GrOffsetX*2 ,'#235574' )
    SetBkgr(bkgG, height ,GraphStyle.Cwidth , GrOffsetX ,'#00374b' )

    ////////////////////////////////////////////
    Zadnjigraf = (new Graph(zadsG,opisElem,width,height))
        .SetContainerStyle(GraphStyle)

    OPISappgraf = (new Graph(opapG,opisElem,headerOpisElem,width,height))
        .SetContainerStyle(GraphStyle)
        .SetInitTranslateOffsetX('topL')
        .SetXoff( (GraphStyle.Cwidth * 3.5 + GrOffsetX * 4) )
        // .SetYoff(-height/2+600)
        .SetDataSource(getPISdata)
        .SetupSubGraph(Zadnjigraf)

    APLIKACIJEgraf = (new Graph(appsG,opisElem,headerOpisElem,width,height))
        .SetContainerStyle(GraphStyle)
        .SetInitTranslateOffsetX('topL')
        .SetXoff( (GraphStyle.Cwidth * 2.5 + GrOffsetX * 3) )
        // .SetYoff(-height/2+400)
        .SetDataSource(getPISdata)
        .SetupSubGraph(OPISappgraf)

    MODULIgraf = (new Graph(modsG,opisElem,headerOpisElem,width,height))
        .SetContainerStyle(GraphStyle)
        .SetInitTranslateOffsetX('topL')
        .SetXoff( (GraphStyle.Cwidth * 1.5 + GrOffsetX * 2)  )
        // .SetYoff(-height/2+200)
        .SetDataSource(getPISdata)
        .SetupSubGraph(APLIKACIJEgraf)

    IPSgraf = (new Graph(ipsG,opisElem,headerOpisElem,width,height))
        .SetContainerStyle(GraphStyle)
        .SetInitTranslateOffsetX('topL')
        .SetXoff( (GraphStyle.Cwidth * 0.5 + GrOffsetX * 1) )
        // .SetYoff(height/30)
        .SetDataSource(getPISdata)
        .SetupSubGraph(MODULIgraf)
        .Populate({'data':IPS_data['data'],'opis':''}); 
    // -width/2 jer od sredine je offset

    
}


window.addEventListener("resize", ()=>{
    console.log('asddasasdasd') 
    d3.select('.graf').select('svg').remove()
    main()
}); 


function SetBkgr(group, height, width,xOffset, color){
    group.append('rect')
        .attr('width',width)
        .attr('height',height)
        .attr('x',xOffset)
        .attr('y',0)
        .attr("fill", color);
}



