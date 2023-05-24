export class SampleManager {
    private static instance: SampleManager;
    public sampleList: SampleData[];
  
    private constructor() {
        this.sampleList = [];
      // Private constructor to prevent direct instantiation
    }
  
    public static getInstance(): SampleManager {
        if (!SampleManager.instance) {
            SampleManager.instance = new SampleManager();
        }
        return SampleManager.instance;
    }
    // Add your singleton methods and properties here
    public greet(): void {
      console.log('Hello, world!');
    }

    public addSamples(samples:SampleData[]):void{
        console.log(SampleManager.instance); // returns "SampleManager {sampleList: Array(0)}"
        samples.forEach((sample) =>{
            SampleManager.instance.sampleList = [...SampleManager.instance.sampleList, sample];
        })

        console.log(SampleManager.instance.sampleList);
    }
  }