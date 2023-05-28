export async function processAudioBuffer(audioBuffer: AudioBuffer, slices: number) {
    let normalizedChannelData = new Float32Array(audioBuffer.length);


    if (audioBuffer.numberOfChannels >= 2) {
        // Get the left and right channel data
        const leftChannelData = audioBuffer.getChannelData(0);
        const rightChannelData = audioBuffer.getChannelData(1);


        if (leftChannelData.length !== rightChannelData.length) {
            console.error('Left and right channel data lengths do not match');
            return [];
        }



        // Sum the corresponding samples from the left and right channels and normalize the values
        normalizedChannelData = leftChannelData.map((sample, index) => {
            // Add corresponding samples from the two channels
            const combinedSample = Math.round(((sample / 2) + (rightChannelData[index] / 2)) * 100);
            const normalizedSample = Math.abs(combinedSample);

            return (normalizedSample * 0.99) + 1;
        });
    } else if (audioBuffer.numberOfChannels === 1) {
        const leftChannelData = audioBuffer.getChannelData(0);

        normalizedChannelData = leftChannelData.map((sample) => {
            return (Math.abs(Math.round(sample * 100)) * 0.99) + 1;
        });
    }

    return normalize( sliceAverage(Array.from(normalizedChannelData), slices), .1 ,1);

    function normalize(array: number[], min: number, max: number): number[] {
        const highest = Math.max(...array);
        const lowest = Math.min(...array);
        return array.map(val => ((val - lowest) / (highest - lowest)) * (max - min) + min);
    }

    function sliceAverage(array: number[], numSlices: number): number[] {
        const sliceLength = Math.ceil(array.length / numSlices);
        let averages: number[] = [];
        for (let i = 0; i < array.length; i += sliceLength) {
            const slice = array.slice(i, i + sliceLength);
            const average = slice.reduce((acc, val) => acc + val, 0) / slice.length;
            averages.push(average);
        }

        return averages;
    }
}
