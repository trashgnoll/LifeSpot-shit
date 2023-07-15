const container = document.getElementById("mover");
const _MaxSlideNum = container.childElementCount - 1;

container.addEventListener("mousedown", containerMouseDown);
container.addEventListener("mousemove", containerMouseMove);
container.addEventListener("mouseup", containerMouseUp);
container.addEventListener("mouseleave", containerMouseLeave);

for (slide of container.children)
	slide.addEventListener("mousedown", slideMouseDown)

let leftButton = document.getElementById("btn-left");
leftButton.addEventListener("click", "prevSlide()");
let rightButton = document.getElementById("btn-right");
rightButton.addEventListener("click", "nextSlide()");

let dotContainer = document.getElementById("dot-container");
for (_ of container.children) {
	let dot = document.createElement("a");
	dot.classList.add("dot");
	dot.setAttribute("onclick", "dotClick()");
	dot.innerHTML = "&nbsp;";
	dotContainer.appendChild(dot);
}

var clickPoint = 0,
	isDrag = false,
	slideNum = 0,
	downTarget = false,
	slideWidth = container.children[0].offsetWidth,
	changeSlide = 0;

function slideMouseDown() {
	let parent = event.target.parentNode;
	slideNum = Array.prototype.indexOf.call(parent.children, event.target);
	downTarget = event.target;
}

function containerMouseDown() {
	clickPoint = event.clientX;
	isDrag = true;
	event.stopPropagation();
}

function translateSlides(offset) {
	let i = 0;
	for (slide of container.children) {
		slide.style.transform = "translate(" + (offset) + "px)";
		i++;
	}
}

function containerMouseMove() {
	if (!isDrag)
		return;
	let dX = event.clientX - clickPoint;
	let offset = -slideWidth * slideNum + dX;
	if (Math.abs(dX) > slideWidth / 4) {
		if (dX < 0)
			changeSlide = 1
		else
			changeSlide = -1;
	}
	translateSlides(offset);
}

function containerMouseUp() {
	let offset = event.clientX - clickPoint;
	if (changeSlide < 0) {
		if (slideNum > 0)
			slideNum--;
	}
	else if (changeSlide > 0) {
		if (slideNum < _MaxSlideNum)
			slideNum++
	}
	containerMouseLeave();
	event.stopPropagation();
}

function showSlide(slideIndex) {
	translateSlides(-slideWidth * slideIndex);
}

function containerMouseLeave() {
	showSlide(slideNum);
	if (isDrag)
		isDrag = false;
	downTarget = false;
	changeSlide = 0;
}

function prevSlide() {
	if (slideNum > 0)
		slideNum--;
	showSlide(slideNum);
}

function nextSlide() {
	if (slideNum < _MaxSlideNum)
		slideNum++;
	showSlide(slideNum);
}

function dotClick() {
	let parent = event.target.parentNode;
	slideNum = Array.prototype.indexOf.call(parent.children, event.target);
	console.log(slideNum);
	showSlide(slideNum);
}