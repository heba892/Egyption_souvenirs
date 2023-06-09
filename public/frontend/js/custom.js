$(document).ready(function () {
    $('.addToCartBtn').click(function (e) {
        e.preventDefault();
      var product_id = $(this).closest('.product_data').find('.prod_id').val();
      var product_qty = $(this).closest('.product_data').find('.qty-input').val();
     // alert(product_id);
     // alert(product_qty);
                $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });   

      $.ajax({
        method: "POST",
        url:"/add-to-cart",
        data:{
            'product_id':product_id,
            'product_qty':product_qty,
        },
        success: function (response) {
            alert(response.status)
        }

    });


    }); 


    $('.increment-btn').click(function (e) {
        e.preventDefault();

       // var inc_value = $('.qty-input').val();
       var inc_value = $(this).closest('.product_data').find('.qty-input').val();
        var value = parseInt(inc_value , 10)
        value = isNaN(value) ? 0 : value;
        if(value <10){
            value++;
            //$('.qty-input').val(value);
            $(this).closest('.product_data').find('.qty-input').val( value);
        }

    });
    $('.decrement-btn').click(function (e) {
        e.preventDefault();

       // var dec_value = $('.qty-input').val();
        var dec_value = $(this).closest('.product_data').find('.qty-input').val();

        var value = parseInt(dec_value , 10)
        value = isNaN(value) ? 0 : value;
        if(value > 1){
            value--;
            //$('.qty-input').val(value);
            $(this).closest('.product_data').find('.qty-input').val( value);

        }

    });
    $('.delete-cart-item').click(function (e) {
        e.preventDefault();


        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });   
        var product_id = $(this).closest('.product_data').find('.prod_id').val();

        $.ajax({
            method: "POST",
            url:"/delete-cart-item",
            data:{
                'product_id':product_id,
                //'product_qty':product_qty,
            },
            success: function (response) {
                window.location.reload();
                alert('',response.status, "success");
            }
    
        });

    });
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    }); 
    $('.changeQuantity').click(function(e){
        e.preventDefault();
        var product_id = $(this).closest('.product_data').find('.prod_id').val();
        var product_qty = $(this).closest('.product_data').find('.qty-input').val();

        data ={
            'product_id' :product_id,
            'product_qty':product_qty,

        }

        $.ajax({
            method: "POST",
            url: "update-cart",
            data: data,
            dataType: "dataType",
            success: function (response) {
                window.location.reload();
            }
        });

    });
});