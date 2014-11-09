if (gon.controller === 'posts') {
    (function (){
        if (gon.action === 'index') {
            $(document).ready(function() {
                $('.like-btn').click(function() {
                    var id = $(this).attr('id');
                    $.ajax({
                        type: "POST",
                        url: "/posts/like",
                        data: {
                            "post_id": 1
                        },
                        success: function(data) {
                            data = document.getElementById(id).innerHTML;
                            console.log(data);
                        },
                        error: function(data) {
                            alert("errror");
                        }
                    });
                });
            });
        }
    })();
}

