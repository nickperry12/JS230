$(function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    let key= $("input[type=text]").val();

    $(document).off("keypress").on("keypress", function (e) {
      if (e.key !== key) {
        return;
      } else {
        $("a").trigger("click");
      }
    });
  });

  $("a").on("click", function(e) {
    e.preventDefault();

    $("div[id='accordion']").slideToggle();
  });
});