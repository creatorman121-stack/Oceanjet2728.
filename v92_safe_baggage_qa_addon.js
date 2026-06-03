/*
OceanJet V92 Optional Baggage QA Add-on
NOT ACTIVE by default. To use, load this file manually after app.js.
Purpose: run non-destructive console checks against window.OCEANJET_DATA or similar app data.
*/
(function(){
  'use strict';
  window.OceanJetV92QA = {
    checkBaggageSlabs(data){
      const db = data || window.OCEANJET_DATA || window.DEFAULT_DB || null;
      if(!db || !db.slabs){
        console.warn('No baggage slab data found.');
        return false;
      }
      const required = ['cebu_maasin','cebu_surigao','cebu_tagbilaran','cebu_dumaguete','cebu_siquijor','cebu_ormoc','cebu_getafe','cebu_palompon'];
      const missing = required.filter(k => !db.slabs[k]);
      const invalid = Object.entries(db.slabs).filter(([k,v]) => !v.normal || !v.fragile || v.normal.length !== 3 || v.fragile.length !== 3).map(([k]) => k);
      console.table({requiredRoutes: required.length, missing: missing.join(', ') || 'none', invalid: invalid.join(', ') || 'none'});
      return missing.length === 0 && invalid.length === 0;
    }
  };
})();
