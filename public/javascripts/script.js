import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.min.js';

window.addEventListener('load', initialize);

const sample_list_parent = document.getElementById("sample-list-parent");
const list_item_template = document.getElementById("list-item-template").content;
let sample_list = document.querySelectorAll(".sample-list-item");
let file_list = new Array(0);

let currently_playing_sample = new Audio();

function initialize() {
    autoAnimate(sample_list_parent);
    ready_dropzone();
    ready_buttons();
}

function set_button_event_listeners(element, sample_name) { // change this later so that it only adds new event listeners to new list items when created
    element.getElementsByClassName("sample-list-button-up")[0].addEventListener('click', move_sample_up);
    element.getElementsByClassName("sample-list-button-down")[0].addEventListener('click', move_sample_down);
    element.getElementsByClassName("sample-list-button-remove")[0].addEventListener('click', remove_sample_from_list);
    element.getElementsByClassName("sample-list-button-play")[0].addEventListener('click', () => {
        play_sample(sample_name);
    });
}

function move_sample_up() {
    const element_to_move = this.closest(".sample-list-item");

    sample_list.forEach((element, index) => {
        if (element_to_move == element) {
            if (index == 0) return;
            file_list.splice(index, 0, file_list.splice(index - 1, 1)[0])
            sample_list_parent.insertBefore(element_to_move, sample_list[index - 1]);
            sample_list = document.querySelectorAll(".sample-list-item");
        }
    });
}

function move_sample_down() {
    const element_to_move = this.closest(".sample-list-item");

    sample_list.forEach((element, index) => {
        if (element_to_move == element) {
            if (index >= sample_list.length - 1) return;
            file_list.splice(index, 0, file_list.splice(index + 1, 1)[0]);
            sample_list_parent.insertBefore(sample_list[index + 1], element_to_move);
            sample_list = document.querySelectorAll(".sample-list-item");
        }
    });
}

function remove_sample_from_list() {
    let sample_list_item = this.closest(".sample-list-item");
    let sample_to_remove_filename = sample_list_item.getElementsByClassName("sample-list-filename")[0].innerHTML;

    file_list.forEach((file, index) => {
        if (file.name == sample_to_remove_filename) {
            sample_list_item.remove();
            file_list.splice(index, 1);
            sample_list = document.querySelectorAll(".sample-list-item");
        }
    });
}

function play_sample(sample_to_play) {

    file_list.forEach((sample) => {
        if (sample.name.toString() == sample_to_play) {
            let reader = new FileReader();

            reader.onload = function (e) {
                currently_playing_sample.pause();
                currently_playing_sample = new Audio(e.target.result);
                currently_playing_sample.play();
            };

            reader.readAsDataURL(sample);
            return;
        }
    });
}

function add_new_sample_list_element(sample_name) {
    let new_sample_list_item = list_item_template.firstElementChild.cloneNode(true);

    new_sample_list_item.setAttribute("sample-list-index", sample_list_parent.childElementCount);
    new_sample_list_item.getElementsByClassName("sample-list-filename")[0].innerHTML = sample_name;
    new_sample_list_item.getElementsByClassName("sample-list-waveform")[0].innerHTML = sample_name + "-waveform";

    set_button_event_listeners(new_sample_list_item, sample_name);
    sample_list_parent.append(new_sample_list_item);

    sample_list = document.querySelectorAll(".sample-list-item");
}

function ready_dropzone() {
    let dropzone = document.getElementById("file-upload-area");

    dropzone.addEventListener('dragenter', dropzone_drag_enter);
    dropzone.addEventListener('dragleave', dropzone_drag_leave);
    dropzone.addEventListener('dragover', dropzone_drag_over);
    dropzone.addEventListener('drop', dropzone_drop);


}

function ready_buttons() {
    let export_button = document.getElementById("export-kit-button");

    export_button.addEventListener('click', export_kit);
}

function export_kit() {
    let file_name_list = [];
    file_list.forEach((file_item) => {
        file_name_list.push(file_item.name);

    })

    console.log(file_name_list);
}

function dropzone_drag_enter(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("dragger entering the area");
}

function dropzone_drag_leave(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("dragger left the area");
}

function dropzone_drag_over(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("dragging over");
}

function dropzone_drop(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("new file just dropped");

    let event_data = event.dataTransfer;
    let files = event_data.files;

    for (let i = 0; i < files.length; i++) {
        if (files[i].size <= 10000000 && files[i].type == "audio/wav") { // file type and size accepted
            let duplicate_found = false;
            file_list.forEach((sample) => {
                if (sample.name == files[i].name) {
                    console.log("duplicate name found");
                    duplicate_found = true;
                }
            })
            if (!duplicate_found) {
                file_list.push(files[i]);
                add_new_sample_list_element(files[i].name);
            }
        }
    }
}