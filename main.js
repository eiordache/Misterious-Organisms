// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  };
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  };
  
  let pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum : specimenNum,
      dna : dna,
  
      mutate() {
        console.log(`Mutating specimen ${this.specimenNum} with DNA: ${this.dna}.`);
        let index = Math.floor(Math.random() * (this.dna.length - 1));
        console.log(`Base ${this.dna[index]} at index ${index} must be mutated!`);
        let randBase = returnRandBase();
        while(randBase === this.dna[index]) {
          randBase = returnRandBase();
        }
        console.log(`Base to be inserted at index is: ${randBase}!`);
        this.dna[index] = randBase;
        console.log(`The new DNA is: ${this.dna}.`);
      },
  
      compareDNA(pAequor) {
        console.log(`Specimen number ${this.specimenNum} DNA is: ${this.dna}.`);
        console.log(`Specimen number ${pAequor.specimenNum} DNA is: ${pAequor.dna}.`);
        console.log(`Comparing...`);
        let counter = 0;
        for(let i = 0; i < this.dna.length; i++) {
          if(this.dna[i] === pAequor.dna[i]) {
            counter += 1;
          }
        } 
        let percentage = ((counter / this.dna.length) * 100).toFixed(3);
        console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} DNA sequences are ${percentage}% alike!`);
      },
  
      willLikelySurvive() {
        console.log(`Checking if specimen ${this.specimenNum} is likely to survive...`);
        let counter = 0;
        for(let i = 0; i < this.dna.length; i++) {
          if(this.dna[i] === 'C' || this.dna[i] === 'G') {
            counter += 1;
          }
        }
        let percentage = ((counter / this.dna.length) * 100).toFixed();
        if(percentage >= 60) {
          console.log(`The specimen has ${percentage}% 'C' or 'G' DNA basis. IT WILL SURVIVE!`);
          return true;
        } else {
          console.log(`The specimen no. ${this.specimenNum} has ${percentage}% 'C' or 'G' DNA basis. It will not survive :(`);
          return false;
        }
        
      },
  
      printSpecimen() {
        console.log(`Specimen number ${this.specimenNum} has DNA: ${this.dna}.`);
      },
    }
  };
  
  const pool = () => {
    let sampleArray = [];
  
    while(sampleArray.length < 30) {
      let i = 0;
      let sample = pAequorFactory(i, mockUpStrand());
      if(sample.willLikelySurvive()) {
        sampleArray.push(sample.dna);
      }
      i++;
    }
    return sampleArray;
  }
  
  const specimen1 = pAequorFactory(1, mockUpStrand());
  const specimen2 = pAequorFactory(2, mockUpStrand());
  const specimen3 = pAequorFactory(3, mockUpStrand());
  const specimen4 = pAequorFactory(4, mockUpStrand());
  
  specimen1.printSpecimen();
  specimen2.printSpecimen();
  specimen3.printSpecimen();
  specimen4.printSpecimen();
  
  specimen1.compareDNA(specimen2);
  
  specimen3.willLikelySurvive();
  
  console.log(pool());
  