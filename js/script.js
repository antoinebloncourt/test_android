// handling document ready and phonegap deviceready
window.addEventListener('load', function () {
    document.addEventListener('deviceready', onDeviceReady, false);
}, false);

var images = new Array();

// Phonegap is loaded and can be used
function onDeviceReady(){
	getFileSystem();
	//showImage();
}

/* make operations on the file system */
function getFileSystem(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){ // success get file system
		var sdcard = fileSystem.root;
		sdcard.getDirectory('download/doc/fpln',{create:false}, function(dcim){
			var gallery = $('#swipeallery');
			listDir(dcim, gallery);
		}, function(error){
			alert(error.code);
		})
	}, function(evt){ // error get file system
		console.log(evt.target.error.code);
	});
}

/* list on console the content of a directory*/
function listDir(directoryEntry, domParent){
	$.mobile.showPageLoadingMsg(); // show loading message
	
	var directoryReader = directoryEntry.createReader();
	var array = [	];	
	directoryReader.readEntries(function(entries){ // success get files and folders
		for(var i=0; i<entries.length; ++i){
			/*
			if( i%2 == 0) domParent.append('<div class="ui-block-a"><div class="thumbnail"><img src="'+entries[i].fullPath+'" title="'+entries[i].name+'" /></div></div>');
			else domParent.append('<div class="ui-block-b"><div class="thumbnail"><img src="'+entries[i].fullPath+'" title="'+entries[i].name+'" /></div></div>');
			//console.log(entries[i].name);
			*/
			//domParent.append('<li><img src="'+entries[i].fullPath+'" title="'+entries[i].name+'" alt="" title="" /></li>');
			array.push( { url:entries[i].fullPath } );
			//console.log(entries[i].name);
		}
		$.mobile.hidePageLoadingMsg(); // hide loading message

		(function(window, Util, PhotoSwipe, array){
			
			Util.Events.domReady(function(e){
				
				var instance;
				/*
				var array = [
						{ url: 'flight_folder/fpln/fplna.gif'},
						{ url: 'flight_folder/fpln/fplnb.gif'},
						{ url: 'flight_folder/fpln/fplnc.gif'}
					];
*/
				alert(array[0]);
				instance = PhotoSwipe.attach(array,					
					{
						target: window.document.querySelectorAll('#viewer')[0],
						preventHide: true,
						getImageSource: function(obj){
							return obj.url;
						},
						getImageCaption: function(obj){
							return obj.caption;
						},
						captionAndToolbarHide: true,
						doubleTapZoomLevel: 1.5,
						swipeThreshold: 100,
						swipeTimeThreshold: 500,
						loop: false
					}
				);
				instance.show(0);
				
			});
			
			
		}(window, window.Code.Util, window.Code.PhotoSwipe));
		
	}, function(error){ // error get files and folders
		alert(error.code);
	});
}

/* show an image */
function showImage(){
	var imgs = $('#gallery img');
	imgs.live('click', function(){
		var title = $(this).attr('title');
		$('#picture h1').text(title);
		$('#pic').html($(this).clone());
		
		$.mobile.changePage($('#picture'));
	});
}
