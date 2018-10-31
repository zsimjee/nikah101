var site = getWebsite();
var query = getSearchQuery().toLowerCase();

function getSearchResults(){
  var result = {"headings": new Array()};
  var search_heading = {"title": "Search", "description": "Results for your query: <mark>"+getSearchQuery()+"</mark>",
                        "phases": new Array()}
  for (var heading_num in site.headings){
    var temp = getHeadingData(site.headings[heading_num]);
    for (var each_result in temp)
        search_heading.phases.push(temp[each_result]);
  }
  result.headings.push(search_heading);
  return result;

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
