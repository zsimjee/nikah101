site = getWebsite();
var query = getSearchQuery();

function getSearchResults(){
  for (var heading_num in website.headings){
    console.log(heading_element);
  }

}


function getSearchQuery(){
  var currentPage = getCurrentPage();
  return decodeURIComponent(currentPage.substring(currentPage.lastIndexOf("=")+1));

}
