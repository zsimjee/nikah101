function populate_page(page_json, target_heading) {
	var content_dom = "";
	for (var heading_num in page_json.headings) {
		content_dom += parseHeading(page_json.headings[heading_num], target_heading);
	}

	$("#content_container").html(content_dom);
}

function parseHeading(_heading, target_heading) {
	if (_heading.title == target_heading) {		
		heading_dom = "<div class='container'><div class='row'>" 
						+ "<h1>" + _heading.title + "</h1>"
						+ "<p>" + _heading.description + "</p>"
					+ "</div><div class='row'>";

		for (var phase_num in _heading.phases) {
			heading_dom += parsePhase(_heading.phases[phase_num], phase_num);
		}

		heading_dom += "</div></div>"

		return heading_dom;
	}
	return "";
}

function parsePhase(_phase, phase_num) {
	phase_dom = "<div><h2>"
					+ _phase.phase
					+ "<br><em>" + _phase.description + "</em>"
				+ "</h2></div>";

	for (var subheading_num in _phase.subheadings) {
		phase_dom += parseSubheading(_phase.subheadings[subheading_num], phase_num, subheading_num);
	}

	return phase_dom;
}

function parseSubheading(_subheading, phase_num, subheading_num) {
	subheading_dom = "<div><div>"
					+"<h4>" + _subheading.subheading
					+ "<br><em>" + _subheading.subheading_description + "</em>"
				+ "</h4></div>"
				+ "<div>";

	var stripe = true;
	for(var link_num in _subheading.links) {
		subheading_dom += parseLink(_subheading.links[link_num], phase_num, subheading_num, link_num, stripe);
		stripe = !stripe;
	}

	subheading_dom += "</div><hr style='width: 100%'/>"

	return subheading_dom;
}

function parseLink(_link, phase_num, subheading_num, link_num, stripe) {
	link_id = phase_num + "_" + subheading_num + "_" + link_num;
	if (_link.link.includes("youtube.com")) {
		return "<div class='container link_section " + (stripe ? "stripe" : "") + "'>"
					+ "<div class='row'><a data-toggle='collapse'  href='#link" + link_id + "'><i class='fa fa-youtube-play' aria-hidden='true'></i>&nbsp;<span class='link_text'>" + _link.name + "</span></a></div>"
					+ "<div class='row'><em>" + _link.description + "</em></div>"
					+ "<div class='row'>"
						+ "<div id='link" + link_id + "' class='panel-collapse collapse'>"
							+ "<iframe src='" + convertYoutubeWatchUrlToEmbedUrl(_link.link) + "' width='560' height='315' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>"
						+ "</div>"
					+ "</div>"
				+ "</div>";
	} else {
		return "<div class='container link_section " + (stripe ? "stripe" : "") + "'>"
					+ "<div class='row'><a class='links' href='" + _link.link + "' target='_blank'><i class='fa fa-link' aria-hidden='true'></i>&nbsp;<span class='link_text'>" + _link.name + "</span></a></div>"
					+ "<div class='row'><em>" + _link.description + "</em></div>"
				+ "</div>";
	}
}

function convertYoutubeWatchUrlToEmbedUrl(watchUrl) {
    if (watchUrl.includes("list=")) {
        return "https://www.youtube.com/embed/videoseries?list=" + getYoutubeIdFromWatchUrl(watchUrl);
    }
    return "https://www.youtube.com/embed/" + getYoutubeIdFromWatchUrl(watchUrl);
}

function getYoutubeIdFromWatchUrl(watchUrl) {
	var splitOn = '';

	if (watchUrl.indexOf('v=') > -1)
		splitOn = 'v=';
	else if (watchUrl.indexOf('list=') > -1)
		splitOn = 'list=';

	var videoId = watchUrl.split(splitOn)[1];
    var ampersandPosition = videoId.indexOf('&') > -1 ? videoId.indexOf('&') : videoId.length;
    if(ampersandPosition != -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }    

    return videoId;
}
