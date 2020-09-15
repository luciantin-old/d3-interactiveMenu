
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

