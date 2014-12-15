$ = require 'jquery'
do fill = (item = 'Something slick') ->
	$('.tagline').append "#{item}"
fill	