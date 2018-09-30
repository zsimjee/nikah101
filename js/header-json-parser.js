function populate_page(page_json, target_heading) {
	var content_dom = "";
	for (var heading_num in page_json.headings) {
		var _heading = page_json.headings[heading_num];
		if (_heading.title == target_heading) {

			content_dom += "<div class='container'><div class='row'>"
							+ "<h1 style='text-align:center'>"+ _heading.title + "</h1>"
							+ "<p>" + _heading.description + "</p>"
						+ "</div><div class='row'>";

			for (var phase_num in _heading.phases) {
				_phase = _heading.phases[phase_num];

				content_dom += "<div><h2 class='text-center'>"
								+ _phase.phase
								+ "<br><em>" + _phase.description + "</em>"
							+ "</h2></div>";

				for (var subheading_num in _phase.subheadings) {
					_subheading = _phase.subheadings[subheading_num];

					content_dom += "<div><div><h4>"
									+ _subheading.subheading
									+ "<br><em>" + _subheading.subheading_description + "</em>"
								+ "</h4></div>"
								+ "<div>";

					var stripe = true;
					for(var link_num in _subheading.links) {
						_link = _subheading.links[link_num];
						link_id = phase_num + "_" + subheading_num + "_" + link_num;

						if (_link.link.includes("youtube.com")) {
							content_dom += "<div class='container link_section " + (stripe ? "stripe" : "") + "'>"
										+ "<div class='row'><a class='links' href='" + _link.link + "' target='_blank'><i class='fa fa-youtube-play' aria-hidden='true'></i>&nbsp;<span class='link_text'>" + _link.name + "</span></a></div>"
										+ "<div class='row'><em>" + _link.description + "</em></div>"
									+ "</div>";
						} else {
							content_dom += "<div class='container link_section " + (stripe ? "stripe" : "") + "'>"
										+ "<div class='row'><a class='links' href='" + _link.link + "' target='_blank'><i class='fa fa-link' aria-hidden='true'></i>&nbsp;<span class='link_text'>" + _link.name + "</span></a></div>"
										+ "<div class='row'><em>" + _link.description + "</em></div>"
									+ "</div>";
						}
						stripe = !stripe;
					}

					content_dom += "</div><hr style='width: 100%'/>"
				}
			}

			content_dom += "</div></div>"
		}
	}

	$("#content_container").html(content_dom);
}
