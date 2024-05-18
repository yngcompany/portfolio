$(function () {
	$('html').easeScroll();

	var $grid = $('.grid'),
		setHtml = '';
	//list Settings
	function listSet(search){
		//filter
		var setFilter = search;
		if(setFilter === 'proposal'){
			setFilter = '제안';
		}else if(setFilter === 'making'){
			setFilter = '제작';
		}else if(setFilter === 'operate'){
			setFilter = '운영';
		}else if(setFilter === '2020'){
			setFilter = '2020';
		}else if(setFilter === '2021'){
			setFilter = '2021';
		}else if(setFilter === '2022'){
			setFilter = '2022';
		}else{
			setFilter = '';
		}

		$grid.empty();
		setHtml = '';
		for(var i = 0, j = 0; i < projectData.length; i++){
			if(setFilter != ''){ //filter-true
				if(setFilter === projectData[i].type || setFilter === String(projectData[i].year)){
					listData(i);
					j++;
				}
				if(i + 1 === projectData.length && j === 0){ //no-data
					listData(false);
				}
			}else{ //filter-false(all list)
				listData(i);
			}
		}
	}
	listSet();

	//list Data Print
	function listData(i){
		var list = projectData[i];
		if($.isNumeric(i) === true){
			setHtml += '<li data-id="' + list.id + '" data-year="' + list.year + '">';
			if(list.url != ''){
				setHtml += '	<a href="#" class="url">';
			}
			setHtml += '		<img src="./contents/' + list.year + '/' + list.month + '-' + list.id + '/' + list.thumbnail + '">';
			if(list.url != ''){
				setHtml += '	</a>';
			}
			setHtml += '	<div class="detail">';
			setHtml += '		<p>';
			setHtml += '			<span class="subject">' + list.subject + '</span>';
			setHtml += '			<span class="type">' + list.detail + ' ' + list.type + '</span>';
			setHtml += '			<span class="date">' + list.year + '.' + list.month + '</span>';
			if(list.cowork != ''){
				setHtml += '			<span class="cowork">' + list.cowork + '</span>';
			}
			setHtml += '		</p>';
			setHtml += '	</div>';
			setHtml += '</li>';
		}else{
			setHtml += '<li class="no-data">검색된 결과가 없습니다.</li>';
		}
		$grid.html(setHtml);
		new AnimOnScroll(document.getElementById('grid'), {
			minDuration : 0.4,
			maxDuration : 0.7,
			viewportFactor : 0.2
		});
	}

	//Search
	$('.gnb li').eq(0).children('a').addClass('active');
	$('.gnb li a').on('click', function (e) {
		$('.gnb li a').removeClass('active');
		$('.grid').empty().removeAttr('style');
		$(this).addClass('active');
		listSet($(this).attr('href'));
		e.preventDefault();
	});

	//View
	$(document).on('click', '.grid li a', function(e){
		var idx = $(this).closest('li').data('id'),
			idxYear = $(this).closest('li').data('year'),
			findIdx = findArrayIndex(projectData, "id", idx, idxYear),
			original = projectData[findIdx],
			file = original.url;
		window.open('./contents/' + original.year + '/' + original.month + '-' + original.id + '/' + file );
		e.preventDefault();
	});

	function findArrayIndex(arraytosearch, key, valuetosearch, year) {
		for (var i = 0; i < arraytosearch.length; i++) {
			if (arraytosearch[i][key] == valuetosearch && arraytosearch[i]['year'] == year) {
				return i;
			}
		}
		return null;
	}
	
	//View Close
	$('.pop-wrap').on('click', function(e){
		var $pop = $('#pop'),
			$popWrap = $('#pop .pop-wrap');

		$pop.fadeOut(250);
		$popWrap.fadeOut(250);
		$('html').css('overflow-y','auto');
	});
});