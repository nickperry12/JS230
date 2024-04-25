$(function () {
	let $p = $("p");
	
	$("a").on('click', function(event) {
    event.preventDefault();
		let $anchor = $(this);
		$p.text("Your favorite fruit is " + $anchor.text());
	});

  $("form").on('submit', function(event) {
    event.preventDefault();
    let $input = $("form").find("input[type=text]");
    $p.text("Your favorite fruit is " + $input.val());
  });
});