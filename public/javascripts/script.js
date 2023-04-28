import autoAnimate from 'https://cdn.jsdelivr.net/npm/@formkit/auto-animate@1.0.0-beta.1/index.min.js';

window.addEventListener('load', initialize);

const sample_list_parent = document.getElementById("sample-list-parent");
const list_item_template = document.getElementById("list-item-template").content;
let sample_list = document.querySelectorAll(".sample-list-item");
let file_list = new Array(0);
let currently_playing_sample = new Audio();
let wavesurfer_array = [];
let sample_data_array = [];

const online_ctx = new AudioContext();
const offline_ctx = new OfflineAudioContext(2, 48000 * 40, 48000);

class sampleData {
    constructor(name, sampleSize) {
        this.name = name;
        this.samples = sampleSize
        this.location = 'unorganized' // TODO: add a possibility for custom paths or custom sample categories
    }
}


function initialize() {
    autoAnimate(sample_list_parent);
    ready_dropzone();
    ready_buttons();

    wavesurfer_array.push(WaveSurfer.create({
        container: '#waveform'
    }))

}

function set_button_event_listeners(element, sample_name) {
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

                const source = online_ctx.createBufferSource();

                online_ctx.decodeAudioData(e.target.result, (buffer) => {
                    source.buffer = buffer;

                    source.connect(online_ctx.destination);
                    source.start(0);
                },
                    (err) => console.error(`Error with decoding audio data: ${err.err}`)
                );
            };

            reader.readAsArrayBuffer(sample);
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
    construct_sample_data_array();
}

function construct_sample_data_array() {
    sample_data_array = [];
    file_list.forEach((sample) => {
        generate_sample_data_from_sample(sample);
    });

    console.log(sample_data_array);

}

function generate_sample_data_from_sample(sample) {

    let reader = new FileReader();

    reader.onload = function (e) {

        offline_ctx.decodeAudioData(e.target.result, (buffer) => {
            sample_data_array.push(new sampleData(sample.name, buffer.length));
        },
            (err) => console.error(`Error with decoding audio data: ${err.err}`)
        );
    };

    reader.readAsArrayBuffer(sample);
}

function export_kit() {
    let file_name_list = [];
    file_list.forEach((file_item) => {
        file_name_list.push(file_item.name);

    })

    const random_name = Math.round(Math.random() * 20000000);

    const template = new KitTemplate();

    XML_provider(template.finalKit(sample_data_array), random_name.toString());

    console.log(file_name_list);

}

class KitTemplate {


    delay = `
        <delay 
            pingPong="1"
            analog="0"
            syncLevel="7" />`;

    compressor = `
        <compressor
            syncLevel="6"
            attack="327244"
            release="936" />`;

    defaultParams = `
        <defaultParams
            reverbAmount="0x80000000"
            volume="0x3504F334"
            pan="0x00000000"
            sidechainCompressorShape="0xDC28F5B2"
            modFXDepth="0x00000000"
            modFXRate="0xE0000000"
            stutterRate="0x00000000"
            sampleRateReduction="0x80000000"
            bitCrush="0x80000000"
            modFXOffset="0x00000000"
            modFXFeedback="0x80000000">
            <delay
                rate="0x00000000"
                feedback="0x80000000" />
            <lpf
                frequency="0x7FFFFFFF"
                resonance="0x80000000" />
            <hpf
                frequency="0x80000000"
                resonance="0x80000000" />
            <equalizer
                bass="0x00000000"
                treble="0x00000000"
                bassFrequency="0x00000000"
                trebleFrequency="0x00000000" />
        </defaultParams>`;

    sound_source_template(input_data) {

        const name = input_data.name.slice(0, -4);

        return `		
            <sound
                name="${name}"
                polyphonic="auto"
                voicePriority="1"
                mode="subtractive"
                lpfMode="24dB"
                modFXType="none">
                <osc1
                    type="sample"
                    loopMode="0"
                    reversed="0"
                    timeStretchEnable="0"
                    timeStretchAmount="0"
                    fileName="SAMPLES/Kit maker/${input_data.location.toString()}/${input_data.name.toString()}">
                    <zone
                        startSamplePos="0"
                        endSamplePos="${input_data.samples}" />
                </osc1>
                <osc2
                    type="sample"
                    loopMode="0"
                    reversed="0"
                    timeStretchEnable="0"
                    timeStretchAmount="0">
                </osc2>
                <lfo1 type="triangle" syncLevel="0" />
                <lfo2 type="triangle" />
                <unison num="1" detune="8" />
                <delay
                    pingPong="1"
                    analog="0"
                    syncLevel="7" />
                <compressor
                    syncLevel="6"
                    attack="327244"
                    release="936" />
                <defaultParams
                    arpeggiatorGate="0x00000000"
                    portamento="0x80000000"
                    compressorShape="0xDC28F5B2"
                    oscAVolume="0x7FFFFFFF"
                    oscAPulseWidth="0x00000000"
                    oscAWavetablePosition="0x00000000"
                    oscBVolume="0x80000000"
                    oscBPulseWidth="0x00000000"
                    oscBWavetablePosition="0x00000000"
                    noiseVolume="0x80000000"
                    volume="0x4CCCCCA8"
                    pan="0x00000000"
                    lpfFrequency="0x7FFFFFFF"
                    lpfResonance="0x80000000"
                    hpfFrequency="0x80000000"
                    hpfResonance="0x80000000"
                    lfo1Rate="0x1999997E"
                    lfo2Rate="0x00000000"
                    modulator1Amount="0x80000000"
                    modulator1Feedback="0x80000000"
                    modulator2Amount="0x80000000"
                    modulator2Feedback="0x80000000"
                    carrier1Feedback="0x80000000"
                    carrier2Feedback="0x80000000"
                    modFXRate="0x00000000"
                    modFXDepth="0x00000000"
                    delayRate="0x00000000"
                    delayFeedback="0x80000000"
                    reverbAmount="0x80000000"
                    arpeggiatorRate="0x00000000"
                    stutterRate="0x00000000"
                    sampleRateReduction="0x80000000"
                    bitCrush="0x80000000"
                    modFXOffset="0x00000000"
                    modFXFeedback="0x00000000">
                    <envelope1
                        attack="0x80000000"
                        decay="0xE6666654"
                        sustain="0x7FFFFFD2"
                        release="0x80000000" />
                    <envelope2
                        attack="0xE6666654"
                        decay="0xE6666654"
                        sustain="0xFFFFFFE9"
                        release="0xE6666654" />
                    <patchCables>
                        <patchCable
                            source="velocity"
                            destination="volume"
                            amount="0x3FFFFFE8" />
                        <patchCable
                            source="aftertouch"
                            destination="volume"
                            amount="0x2A3D7094" />
                        <patchCable
                            source="y"
                            destination="lpfFrequency"
                            amount="0x19999990" />
                    </patchCables>
                    <equalizer
                        bass="0x00000000"
                        treble="0x00000000"
                        bassFrequency="0x00000000"
                        trebleFrequency="0x00000000" />
                </defaultParams>
                <arpeggiator
                    mode="off"
                    numOctaves="2"
                    syncLevel="7" />
                <modKnobs>
                    <modKnob controlsParam="pan" />
                    <modKnob controlsParam="volumePostFX" />
                    <modKnob controlsParam="lpfResonance" />
                    <modKnob controlsParam="lpfFrequency" />
                    <modKnob controlsParam="env1Release" />
                    <modKnob controlsParam="env1Attack" />
                    <modKnob controlsParam="delayFeedback" />
                    <modKnob controlsParam="delayRate" />
                    <modKnob controlsParam="reverbAmount" />
                    <modKnob controlsParam="volumePostReverbSend" patchAmountFromSource="compressor" />
                    <modKnob controlsParam="pitch" patchAmountFromSource="lfo1" />
                    <modKnob controlsParam="lfo1Rate" />
                    <modKnob controlsParam="pitch" />
                    <modKnob controlsParam="stutterRate" />
                    <modKnob controlsParam="bitcrushAmount" />
                    <modKnob controlsParam="sampleRateReduction" />
                </modKnobs>
            </sound>`
    }

    sound_sources(sample_data_array_input) {

        console.log(sample_data_array_input);

        let constructed_xml = '';

        sample_data_array_input.forEach(element => {
            constructed_xml += this.sound_source_template(element);
        });

        return `${constructed_xml}`
    }


    finalKit(sample_data_array_input) {
        console.log(sample_data_array_input);
        return `
        <kit
            firmwareVersion="4.1.3"
            earliestCompatibleFirmware="4.1.0-alpha" 
            lpfMode="24dB" 
            modFXType="flanger"
            modFXCurrentParam="feedback"
            currentFilterType="lpf"> 
            ${this.delay}
            ${this.compressor}
            ${this.defaultParams}
            <soundSources>
                ${this.sound_sources(sample_data_array_input)}
            </soundSources>
            <selectedDrumIndex>2</selectedDrumIndex>
        </kit>
        `;
    }

}

function XML_provider(xml_content, fileName) {

    const xml_versioning_text = '<?xml version="1.0" encoding="UTF-8"?>';
    const file_prefix = '.xml';
    const final_xml = xml_versioning_text + xml_content;
    const pom = document.createElement('a');
    const bb = new Blob([final_xml], { type: 'text/plain;' });

    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', (fileName + file_prefix));

    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true;
    pom.classList.add('dragout');

    pom.click();

}