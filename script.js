const canvas = document.querySelector(".canvas")
const colorPicker = document.querySelector("input");
const colorModeBtn = document.querySelector(".color-mode");
const rainbowModeBtn = document.querySelector(".rainbow-mode");
const clearAllBtn = document.querySelector(".clear-mode");
const eraserModeBtn = document.querySelector(".eraser-mode");
const size8Btn = document.querySelector(".canvas-option-8");
const size16Btn = document.querySelector(".canvas-option-16");
const size32Btn = document.querySelector(".canvas-option-32");
const size64Btn = document.querySelector(".canvas-option-64");
const saveBtn = document.querySelector(".save");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");

colorPicker.style.backgroundColor = colorPicker.value;

let pixel;
let mouseDown = false;
document.body.onmousedown = function() {
    mouseDown = true;
};
document.body.onmouseup = function() {
    mouseDown = false;
};

function setCanvas(number){
    canvas.innerHTML = "";
    canvas.style.setProperty("--grid-rows", number);
    canvas.style.setProperty("--grid-cols", number);
    for(let i = 0; i < number * number; i++){
        let pixel = document.createElement("div");
        canvas.appendChild(pixel).className = "canvas-grid";
    }
    
    pixel = document.querySelectorAll(".canvas-grid");
    pixel.forEach((pxl) => pxl.addEventListener("click", () => {
        if(colorModeBtn.classList.contains("option--active")){
            pxl.style.backgroundColor = colorPicker.value;
        }else if(rainbowModeBtn.classList.contains("option--active")){
            pxl.style.backgroundColor = `rgb(${Math.trunc(Math.random()*255)+1},${Math.trunc(Math.random()*255)+1},${Math.trunc(Math.random()*255)+1})`;
        }else {
            pxl.style.backgroundColor = "#ffffff";
        }
    }))
    pixel.forEach((pxl) => pxl.addEventListener("mouseover", () => {
        if(mouseDown){
            if(colorModeBtn.classList.contains("option--active")){
                pxl.style.backgroundColor = colorPicker.value;
            }else if(rainbowModeBtn.classList.contains("option--active")){
                pxl.style.backgroundColor = `rgb(${Math.trunc(Math.random()*255)+1},${Math.trunc(Math.random()*255)+1},${Math.trunc(Math.random()*255)+1})`;
            }else {
                pxl.style.backgroundColor = "#ffffff";
            }
        }
    }))

    colorPicker.addEventListener("change", () => colorPicker.style.backgroundColor = colorPicker.value);
}

function takeScreenshot(){
    html2canvas(canvas).then(function (screenshot) {
        modal.appendChild(screenshot)
    })
}


setCanvas(8);
size8Btn.classList.add("option--active");
colorModeBtn.classList.add("option--active");
modalBackground.classList.add("hidden");


colorModeBtn.addEventListener("click", () => {
    colorModeBtn.classList.add("option--active");
    rainbowModeBtn.classList.remove("option--active");
    eraserModeBtn.classList.remove("option--active");
})

rainbowModeBtn.addEventListener("click", () => {
    colorModeBtn.classList.remove("option--active");
    rainbowModeBtn.classList.add("option--active");
    eraserModeBtn.classList.remove("option--active");
})

eraserModeBtn.addEventListener("click", () => {
    colorModeBtn.classList.remove("option--active");
    rainbowModeBtn.classList.remove("option--active");
    eraserModeBtn.classList.add("option--active");
})

clearAllBtn.addEventListener("click", () => {
    pixel.forEach((pxl) => pxl.style.backgroundColor = "#ffffff")
})


size8Btn.addEventListener("click", () => {
    setCanvas(8);
    if(size8Btn.classList.contains("option--active")){
        return;
    }else {
        size8Btn.classList.add("option--active");
        size16Btn.classList.remove("option--active");
        size32Btn.classList.remove("option--active");
        size64Btn.classList.remove("option--active");
    }
});
size16Btn.addEventListener("click", () => {
    setCanvas(16)
    if(size16Btn.classList.contains("option--active")){
        return;
    }else {
        size8Btn.classList.remove("option--active");
        size16Btn.classList.add("option--active");
        size32Btn.classList.remove("option--active");
        size64Btn.classList.remove("option--active");
    }
});
size32Btn.addEventListener("click", () => {
    setCanvas(32)
    if(size32Btn.classList.contains("option--active")){
        return;
    }else {
        size8Btn.classList.remove("option--active");
        size16Btn.classList.remove("option--active");
        size32Btn.classList.add("option--active");
        size64Btn.classList.remove("option--active");
    }
});
size64Btn.addEventListener("click", () => {
    setCanvas(64)
    if(size64Btn.classList.contains("option--active")){
        return;
    }else {
        size8Btn.classList.remove("option--active");
        size16Btn.classList.remove("option--active");
        size32Btn.classList.remove("option--active");
        size64Btn.classList.add("option--active");
    }
});

modal.addEventListener("click", (e) => {
    e.stopPropagation()
})

modalBackground.addEventListener("click", (e) => {
    modalBackground.classList.add("hidden")
    modal.removeChild(modal.lastElementChild)
})

saveBtn.addEventListener("click", function(){
    modalBackground.classList.remove("hidden")
    takeScreenshot();
})