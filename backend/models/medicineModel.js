class Medicine {
  constructor(obj) {
    this.brandName = obj.brandName;
    this.dci = obj.dci
    this.pharmForm = obj.pharmForm;
    this.dose = obj.dose;
    this.units = obj.units;
    this.reconstitutionSolvent = obj.reconstitutionSolvent;
    this.reconstitutionVolume = obj.reconstitutionVolume;
    this.reconstitutionFinalConcentration = obj.reconstitutionFinalConcentration;
    this.saline = obj.saline ? true : false;
    this.glucose = obj.glucose ? true : false;
    this.maxSalineDilution = obj.maxSalineDilution;
    this.minSalineDilution = obj.minSalineDilution;
    this.minGlucoseDilution = obj.minGlucoseDilution;
    this.maxGlucoseDilution = obj.maxGlucoseDilution;
    this.stabilityDilutedSolvent = obj.stabilityDilutedSolvent;
    this.stabilityDilutedVolume = obj.stabilityDilutedVolume;
    this.stabilityDilutedCondition = obj.stabilityDilutedCondition;
    this.stabilityDilutedTime = obj.stabilityDilutedTime;
    this.stabilityUndilutedCondition = obj.stabilityUndilutedCondition; 
    this.stabilityUndilutedTime = obj.stabilityUndilutedTime;
    this.image = obj.image;
    this.firstLetter = obj.dci[0].toLowerCase();
    this.createdAt = obj.createdAt || Date.now();
    this.updatedAt = Date.now();
  }

  validate() {
    for (let key in this) {
        if (this[key] == null || this[key] === '') {
            this[key] = "N/A"
        }
    }
    return this
  }
}

export default Medicine;
