var site = getWebsite();
var query = getSearchQuery().toLowerCase();

function getSearchResults(){
  var result = {"headings": new Array()};
  var search_heading = {"title": "Search", "description": "<h1> - Results for your query: <mark><b>"+getSearchQuery()+"</b></mark><br><br></h1>",
                        "phases": new Array()}
  for (var heading_num in site.headings){
    var temp = getHeadingData(site.headings[heading_num]);
    for (var each_result in temp)
        search_heading.phases.push(temp[each_result]);
  }
  result.headings.push(search_heading);
  return highlightSearchTerms(result);

}

function getHeadingData(heading){
  var heading_results = new Array();

  for (var phase_num in heading.phases){
      var temp = getPhaseData(heading.title, heading.phases[phase_num]);
      if (temp != null)
        heading_results.push(temp);
  }
  return heading_results;

}

function getPhaseData(heading_title, phase){
  var phase_result = new Object();
  phase_result.phase = heading_title + " - " + phase.phase;
  phase_result.description = phase.description;
  phase_result.subheadings = new Array();

  if (phase.description.toLowerCase().includes(query)){
    phase_result.subheadings = phase.subheadings;
    return phase_result;
  }
  for (var subheading_num in phase.subheadings){
    var temp = getSubheadingData(heading_title, phase.subheadings[subheading_num]);
    if (temp.links.length != 0){
      phase_result.subheadings.push(temp);
    }
  }
  if (phase_result.subheadings.length != 0)
    return phase_result;

}

function getSubheadingData(heading_title, subheading){
  //console.log(heading_title + subheading.subheading);
  var subheading_result = subheading;
//   console.log(heading_title + " - " + subheading.subheading +
// " " + subheading.subheading_description);
  if (subheading.subheading.toLowerCase().includes(query) || subheading.subheading_description.toLowerCase().includes(query)){
    return subheading_result;
  }
  else{
    subheading_result = new Object();
    subheading_result.subheading = subheading.subheading;
    subheading_result.subheading_description = subheading.subheading_description;
    subheading_result.links = new Array();
    for (var link_num in subheading.links){
      if (subheading.links[link_num].name.toLowerCase().includes(query) ||
    subheading.links[link_num].description.toLowerCase().includes(query)){
        subheading_result.links.push(subheading.links[link_num]);
      }
    }
    return subheading_result;
  }
}


function getSearchQuery(){
  var currentPage = window.location.href;
  currentPage.substring(currentPage.lastIndexOf("/") + 1);
  return decodeURIComponent(currentPage.substring(currentPage.lastIndexOf("=")+1));

}

function highlightSearchTerms(search_json){
  if (search_json.headings.length == 0)
      return search_json;

  for (var p_num in search_json.headings[0].phases){
    search_json.headings[0].phases[p_num].description = addHighlight(search_json.headings[0].phases[p_num].description);
    for (var sub_num in search_json.headings[0].phases[p_num].subheadings){
      search_json.headings[0].phases[p_num].subheadings[sub_num].subheading = addHighlight(search_json.headings[0].phases[p_num].subheadings[sub_num].subheading);
      search_json.headings[0].phases[p_num].subheadings[sub_num].subheading_description = addHighlight(search_json.headings[0].phases[p_num].subheadings[sub_num].subheading_description);
      for (var l_num in search_json.headings[0].phases[p_num].subheadings[sub_num].links){
        search_json.headings[0].phases[p_num].subheadings[sub_num].links[l_num].name = addHighlight(search_json.headings[0].phases[p_num].subheadings[sub_num].links[l_num].name);
        search_json.headings[0].phases[p_num].subheadings[sub_num].links[l_num].description = addHighlight(search_json.headings[0].phases[p_num].subheadings[sub_num].links[l_num].description);
      }
    }


  }
  return search_json;
}

function addHighlight(source){
  var result = "";
  var i = 0;
  while (i < source.length){
    if (source.substring(i, i+query.length).toLowerCase() == query){
      result += "<span style='background-color: yellow;'>" + source.substring(i, i+query.length) + "</span>";
      i += query.length
    }
    else{
      result += source.substring(i, i+1);
      ++i;
    }
  }
  return result;
}
