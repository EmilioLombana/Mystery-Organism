// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function for creating multiple instances of pA
const pAequorFactory = (specimenNum, dna) => {
  const species = {
    specimenNum,
    dna,
    mutate() {
      let randIndex = Math.floor(Math.random() * dna.length);
      let randBase = returnRandBase();
      if (randBase != this.dna[randIndex]) {
        this.dna[randIndex] = randBase;
      } else {
        mutate();
      }
    },
    compareDna(obj) {
      comparisonArr = [];
      if (this.specimenNum != obj.specimenNum) {
        for (let i = 0; i <= this.dna.length; i++) {
          for (let j = 0; j <= obj.dna.length; j++) {
            if (this.dna[i] === obj.dna[j] && i === j) {
              comparisonArr.push(this.dna[i]);
            }
          }
        }
      }
      const percentage = ((comparisonArr.length / 15) * 100).toFixed(2) + "%";
      return `Specimen ${this.specimenNum} & Specimen ${obj.specimenNum} have ${percentage} identical DNA.`;
    },
    willLikelySurvive(){
      const goodBases = [];
      for (let i = 0; i <= this.dna.length; i++){
        if(this.dna[i] == 'C' || this.dna[i] == 'G'){
          goodBases.push(this.dna[i])
        }
      }
      const survivalRate = goodBases.length / 15 * 100;
      if(survivalRate >= 60){
        return true;
      } else {
        return false
      }
    }
  };
  return species;
};

const survivingSpecimen = [];
let idCounter = 1;
while(survivingSpecimen.length < 30){
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  idCounter++
  if(newOrg.willLikelySurvive()){
    survivingSpecimen.push(newOrg);
  }
}
console.log(survivingSpecimen)
