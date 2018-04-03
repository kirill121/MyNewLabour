// $('#one').click(function(){
//     alert('fuck u')
// })

$('.popup').click(function(){
    $(this).children('.popuptext').toggleClass("show");
})

// function ratingButton1(val){
// 	ratingsArray.push(val)
// 	var counter = 0;
// 	var sumOfArray = ratingsArray.reduce(function(accu, val){
// 		if(val > 0){
// 			counter++
// 		}
// 		return accu + val
// 	}, 0)
// 	return sumOfArray / counter
// };	
