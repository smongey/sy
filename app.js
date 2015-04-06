// HONK
window.l = function(){
	console.log(arguments);
};


$(function(){

	var projects = [];
	var site = [];

	$.getJSON( "work.json", function(data) {
		projects = data;
	});

	$.getJSON( "site.json", function(data) {
		site = data;
		$(window).trigger('hashchange');
	});

	$(window).on('hashchange', function(){

		render(window.location.hash);

	});

	function convertToUrl(page) {
		return page
			.replace(/\s+/g, '-')
			.replace('/', '-')
			.replace('&', 'and')
			.toLowerCase();
	}

	// RENDER ALL PROJECTS
	function renderProjects(data){


		var page = $('#wrap'),
			theTemplateScript = $("#projects").html(),
			theTemplate = Handlebars.compile (theTemplateScript);

		$('#wrap').empty();
		
		renderNav(site);
		
		page.append(theTemplate(data));

		page.find('.project').on('click', function (e) {
			e.preventDefault();

			var productIndex = $(this).data('id'),
				url = convertToUrl(projects[productIndex].title);

			window.location.hash = '/' + productIndex + '/' + url;
		});

	}

	function renderSingleProject(index, data) {

		var page = $('#wrap'),
			theTemplateScript = $("#single").html(),
			theTemplate = Handlebars.compile(theTemplateScript);

		$('.single').remove();
		page.append( theTemplate(data[index]) );
		
		$('body').addClass('noscroll');
		
		$('.close').on('click', function(e){
			e.preventDefault();
			$('.single').remove();
			$('body').removeClass('noscroll');
			window.location.hash = '#';
		});
	}

	function renderAbout(data) {
		
		var page = $('#wrap'),
			theTemplateScript = $('#about').html(),
			theTemplate = Handlebars.compile(theTemplateScript);

		page.append(theTemplate(data[0]));

		$('.about').on('click', function(e){
			e.preventDefault();
			$(this).remove();
			window.location.hash = '#';
		});
	}

	function renderNav(data) {
		
		var page = $('#wrap'),
			theTemplateScript = $('#navigation').html(),
			theTemplate = Handlebars.compile(theTemplateScript);

		page.append(theTemplate(data[0]));

	}

	function render(url) {

		if (url.split('/')[2] == true) {
			var currentPage = url.split('/')[1];
		} else {
			var currentPage = url.split('/')[0];
		}

		$('#wrap').addClass('hidden');

		var routes = {

			'' : function() {
				renderProjects(projects);
			},
			
			'#' : function() {
				var index = url.split('/')[1];
				renderSingleProject(index, projects);
			},
			
			'#about' : function() {
				renderAbout(site);
			}
		};

		if (routes[currentPage]) {
			routes[currentPage]();
		} 
		else {
			renderErrorPage(currentPage);
		}
	}

	function renderErrorPage(currentPage) {
		// console.log(currentPage);
		l('error page');
	}
});
