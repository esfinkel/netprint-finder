// for each printer, store (0: name, 1: text-form location, 2: bw or color info, 3: decimal latitude, 4: decimal longitude, 5: schedule)
// for schedule: {0:[,],1:[,],2:[,],3:[,],4:[,],5:[,],6:[,]} where monday is 0
// coordinates have all been manually confirmed. Let's try to keep it that way.


const printers_bw = [
    // ['aap-nyc-1bw','NYTech (direct print; card reader)','campus-bw, campus-color','40.755805','-73.956233',null], // similar listed in color
    // ['aap-sib-1bw','Sibley Hall - 3rd Floor Lab (Barclay Jones)','campus-bw, campus-color','42.4509802','-76.4840158',null], // similar listed in color
    // ['aap-sib-3bw','Sibley Hall - 2nd Floor Lab (ADMS) (direct print; card reader?)','campus-bw, campus-color','42.4509802','-76.4840158',null], // similar listed in color
    // ['aap-sib-4bw','Sibley Hall - 3rd Floor Balcony (inside dome) (direct print; card reader?)','campus-bw, campus-color','42.4509802','-76.4840158',null],  // similar listed in color
    // ['aap-tjaden-1bw','Tjaden Hall - Take elev. to 2W (direct print or card reader)','campus-bw, campus-color','42.4509025','-76.4853131',null], // similar listed in color
    ['afr-lib1','Africana Library','campus-bw, campus-color','42.4573916','-76.4822137',{0:[9,23],1:[9,23],2:[9,23],3:[9,23],4:[9,17],5:[13,17],6:[16,23]}],
    ['appel1','Appel Commons Community Center - 1st Floor','campus-bw',42.453551, -76.476199,{0:[9,22],1:[9,22],2:[9,22],3:[9,22],4:[9,22],5:[11,22],6:[12,22]}],
    ['becker-nprint1','Becker House - Room G39 - Computer Lab - North wing - Ground floor','campus-bw','42.448204','-76.4894583',null],
    ['becker-nprint2','Becker House - Computer lab - North wing - Ground floor Room# G39','campus-bw','42.448204','-76.4894583',null],
    // ['bin1/bin2/bin3','Statler Hall 365 - by the lab monitor desk - second through fourth from window','campus-bw',42.445524, -76.482054, null], // similar listed in color
    ['catherwood-lnge','Catherwood Library - 136 Ives Hall - First Floor Lounge','campus-bw, campus-color','42.4472562','-76.4811158',null],
    // ['catherwood-np1/catherwood-np2/catherwood-np3','Catherwood Library - 236 Ives Hall - Reference Area','campus-bw, campus-color','42.4472562','-76.4811158',null],  // similar listed in color
    ['cisuglab','Gates Hall - Room G33 (CS majors/staff only. direct print; no card reader?)','campus-bw','42.4449769','-76.4810912',null],
    // ['cit-carp-1bw/cit-carp-3bw','Carpenter Hall Computer Lab - Main Floor','campus-bw, campus-color','42.444767','-76.484124',{0:[0,600],1:[0,600],2:[0,600],3:[0,600],4:[0,600],5:[0,600],6:[0,600]}], // similar listed in color
    ['cit-carp-4bw/cit-carp-5bw','Carpenter Hall Computer Lab - Second Floor Hallway','campus-bw, campus-color','42.444767','-76.484124',{0:[0,600],1:[0,600],2:[0,600],3:[0,600],4:[0,600],5:[0,600],6:[0,600]}],
    // ['cit-mann220a-1bw/cit-mann220a-2bw','Mann Library Computer Lab - Room 220A - Second Floor','campus-bw, campus-color','42.448766','-76.4763118',null], // similar listed in color
    // ['cit-ph318-1bw/cit-ph318-2bw','Phillips Hall Computer Lab - Room 318','campus-bw, campus-color','42.4445768','-76.4820529',null], // similar listed in color
    // ['cit-rpcc-1bw/cit-rpcc-2bw','Robert Purcell Community Center - RPCC - Computer Lab - Room 207','campus-bw, campus-color',42.455927, -76.477516,{0:[9,23.99],1:[9,23.99],2:[9,23.99],3:[9,23.99],4:[9,23.99],5:[11,23.99],6:[12,23.99]}], // similar listed in color
    ['cit-surge-1bw','Ag Quad - Academic Surge B - Room 159','campus-bw, campus-color',42.448060, -76.478295,null],
    // ['cit-upson-1bw/cit-upson-2bw','Upson Hall - Room 225','campus-bw, campus-color','42.4439852','-76.4828736',null], // similar listed in color
    // ['cit-uris-1bw/cit-uris-2bw','Uris Library - Tower Room Computer Lab - Downstairs from Entrance','campus-bw, campus-color',42.447700, -76.485246,{0:[8,25],1:[8,25],2:[8,25],3:[8,25],4:[8,21],5:[12,21],6:[10,25]}], // similar listed in color
    ['cit-uris-3bw','Uris Library - Electronic Classroom - Room B05','campus-bw, campus-color',42.447705, -76.485272,{0:[8,25],1:[8,25],2:[8,25],3:[8,25],4:[8,21],5:[12,21],6:[10,25]}],
    // ['cit-wsh-1bw/cit-wsh-2bw','Willard Straight Hall - Computer Lab - Basement Level','campus-bw, campus-color','42.4465919','-76.4856765',{0:[9,16],1:[9,16],2:[9,16],3:[9,16],4:[9,16],5:[0,-1],6:[0,-1]}], // similar listed in color
    // ['ciw2','District of Columbia - Cornell in Washington','campus-bw, campus-color','38.908391', '-77.048506' ,null], // similar listed in color
    ['cook-nprint1','Alice Cook House - Computer Lab','campus-bw','42.4489805','-76.4896109',null],
    ['dss-mps-lab1','MPS Statistics computing lab room Mallot 301A - card reader door access for MPS students only','campus-bw','42.4479101','-76.4800518',null],
    ['gs1','Goldwin Smith Hall - Room 338 (direct print; card reader?)','campus-bw','42.4490733','-76.4835344',null], // building open 24/7
    ['gs3','Goldwin Smith Hall – Room 213 (direct print; card reader?)','campus-bw','42.4490733','-76.4835344',null], // building open 24/7
    // ['hollister1','Hollister 202 CEE Undergrad Lounge (direct print; card reader?)','campus-bw','42.4443332','-76.4847092',null], // similar listed in color
    ['house5','Rose House - Computer Lab - Room# 110','campus-bw','42.4477928','-76.4888006',null],
    ['ilr-lab1/ilr-lab2','Ives Hall - Room 118 - Computer Lab','campus-bw, campus-color','42.4472571','-76.4811162',{0:[8,23],1:[8,23],2:[8,23],3:[8,23],4:[8,17],5:[0,0],6:[14,23]}],
    ['keeton-nprint1','Keeton House - Room 151 - Computer Lab','campus-bw','42.4467158','-76.4894902',null],
    ['kroch-lib1','Kroch Library - 1st floor Asia reading room','campus-bw, campus-color','42.4477741','-76.4841596',{0:[8,26],1:[8,26],2:[8,26],3:[8,26],4:[8,22],5:[10,22],6:[10,26]}],
    // ['laprinter2','Kennedy Hall - Room 467 (direct print; card reader?)','campus-bw','42.4482603','-76.4793974',null], // similar listed in color
    ['law-lib1','Law Library - 3rd floor','campus-bw','42.4438549','-76.4857724',{0:[8,20],1:[8,20],2:[8,20],3:[8,20],4:[8,17],5:[11,17],6:[12,20]}],
    // ['mann1/mann2/mann3','Mann Library - First Floor','campus-bw, campus-color','42.4487577','-76.4763118',{0:[8,24],1:[8,24],2:[8,24],3:[8,24],4:[8,18],5:[12,19],6:[12,24]}],  // similar listed in color
    ['mann6','Mann Library - 2nd Floor','campus-bw, campus-color','42.448766','-76.4763118',{0:[8,24],1:[8,24],2:[8,24],3:[8,24],4:[8,18],5:[12,19],6:[12,24]}],
    // ['math-lib2','Mallott Hall - Math Library - Fourth Floor','campus-bw','42.4482224','-76.4802083',{0:[8,20],1:[8,20],2:[8,20],3:[8,20],4:[8,20],5:[0,0],6:[13,22]}], // similar listed in color
    ['mcfaddin1/mcfaddin2','McFaddin - Room G22 - Computer Lab','campus-bw','42.447337', '-76.487931',null],
    ['morrison-1','Morrison Hall - Animal Science Undergraduate Student Lounge - Room 140 (direct print; card reader?)','campus-bw','42.446309','-76.469368',null],
    ['mseugrad','Bard Lab 247 (direct print; card reader?)','campus-bw','42.443930', '-76.484052',null],
    // ['mth-372/mth-373/mth-374/mth-375','Myron Taylor Hall 2nd Floor Computer Lab (direct print; card reader?)','campus-bw','42.444460','-76.486113',null], // similar listed in color
    ['mth-ilj','Myron Taylor Hall International Law Journal Office (direct print; card reader?)','campus-bw','42.444460','-76.486113',null],
    ['mth-jlpp','Myron Taylor Hall Journal Law and Public Policy Office (direct print; card reader?)','campus-bw','42.444460','-76.486113',null],
    ['mth-lawreview','Myron Taylor Hall Law Review Office (direct print; card reader?)','campus-bw','42.444460','-76.486113',null],
    ['mth-studentorg','Myron Taylor Hall Student Organizations Office (direct print; card reader?)','campus-bw','42.444460','-76.486113',null],
    ['music-lib1','Music Library - 3rd floor Lincoln Hall','campus-bw, campus-color','42.4501817','-76.4833675',{0:[9.0,22.0],1:[9.0,22.0],2:[9.0,22.0],3:[9.0,22.0],4:[9.0,17.0],5:[12.0,5.0],6:[14.0,22.0]}],
    // ['olin-lib1/olin-lib2/olin-lib3/olin-lib4','Olin Library - MOVED to downstairs in stacks','campus-bw, campus-color','42.447905','-76.484293',{0:[8,26],1:[8,26],2:[8,26],3:[8,26],4:[8,22],5:[10,22],6:[10,26]}], // similar listed in color
    ['olin-lib6','Olin Library - B12','campus-bw, campus-color','42.447905','-76.484293',{0:[8,26],1:[8,26],2:[8,26],3:[8,26],4:[8,22],5:[10,22],6:[10,26]}],
    ['olin-lib7','Olin Library - 5th floor Grad Study','campus-bw, campus-color','42.447905','-76.484293',{0:[8,26],1:[8,26],2:[8,26],3:[8,26],4:[8,22],5:[10,22],6:[10,26]}],
    ['orie-netprint2','Rhodes Hall - Room 453 (direct print; no card reader)','campus-bw',42.4433613,-76.4812668,null],
    ['orie-netprint3','Rhodes Hall - Room 411 (was 421. direct print; no card reader)','campus-bw',42.4433613,-76.4812668,null],
    ['sage-205/sage-205-bw2','Sage Hall - Room 205 Suite - Next to Dean\'s Office','campus-bw, campus-color','42.4458918','-76.4833009',null],
    ['sage-301-bw','Sage Hall johnson Library - Room 301 - Third Floor Collaboration Space','campus-bw, campus-color','42.4458947','-76.4832581',null],
    ['sage-basement-a/sage-basement-b','Sage Hall - Basement - Near Student Mailboxes','campus-bw','42.4458918','-76.4833009',null],
    // ['sage-lib1-bw/sage-lib2-bw','Sage Hall - johnson Library - First Floor','campus-bw','42.4458918','-76.4833009',{0:[7,21],1:[7,21],2:[7,21],3:[7,21],4:[7,21],5:[7,21],6:[7,21]}], // similar listed in color
    ['schwartz1','Schwartz Center - Second Floor - Near elevator (direct print; card reader?)','campus-bw',42.4424328,-76.4859273,null],
    ['sha-grad1','Statler Hall G0032 (direct print; card reader?)','campus-bw',42.445524, -76.482054,null],
    ['sha-grad2','Statler Hall 245','campus-bw (direct print; card reader?)',42.445524, -76.482054,null],
    ['sha-mslc-front1/sha-mslc-front2/sha-mslc-front3','Nestle Library - west side of reference desk','campus-bw',42.445553, -76.482130,{0:[8,23.5],1:[8,23.5],2:[8,23.5],3:[8,23.5],4:[8,18.5],5:[12,18.5],6:[12,23.5]}],
    ['sha-mslc-lounge','Statler Hall Ground Floor Student Lounge - North side of room','campus-bw',42.445524, -76.482054,null],
    ['sha-mslc-quick','Nestle Library - by the standup "Quick Print" stations','campus-bw',42.445553, -76.482130,null],
    ['snee-netprint1','Snee Hall Student Lounge','campus-bw','42.443653','-76.484938',null],
    ['tatkon1','South Balch Hall - Tatkon Center - Front Desk','campus-bw','42.453212','-76.479392',{0:[8,23],1:[8,23],2:[8,23],3:[8,23],4:[8,17.5],5:[0,0],6:[15,23]}],
    // ['uris-lib1','Uris Library - In Front of Circulation Desk','campus-bw, campus-color',42.447727, -76.485350,{0:[8,25],1:[8,25],2:[8,25],3:[8,25],4:[8,21],5:[12,21],6:[10,25]}], // similar listed in color
    // ['uris-lib3','Uris Library - Austen Room','campus-bw, campus-color',42.447727, -76.485350,{0:[8,25],1:[8,25],2:[8,25],3:[8,25],4:[8,21],5:[12,21],6:[10,25]}], // similar listed in color
    ['uris-lib5','Uris Library - CL3 Lab','campus-bw, campus-color',42.447716, -76.485290,{0:[8,25],1:[8,25],2:[8,25],3:[8,25],4:[8,21],5:[12,21],6:[10,25]}],
    // ['vetlib3','Schurman Hall - S1201 (direct print; card reader?)','campus-bw','42.4480179','-76.4661765',{0:[7.5,23],1:[7.5,23],2:[7.5,23],3:[7.5,23],4:[7.5,20],5:[10,20],6:[10,23]}], // similar listed in color
    ['vm-bilinski-01','Bilinski Lab (direct print; card reader?)','campus-bw',42.447487, -76.465832,null], // not 100% sure
    ['vm-wiswall-01/vm-wiswall-02','Wiswall Lab (direct print; card reader?)','campus-bw',42.447487, -76.465832,null],
    ['whitelab','White Hall - Room B10 (direct print; faculty and grads only)','campus-bw','42.4502416','-76.4853705',null]

]

const printers_color = [

    ['aap-mil-1mfp/aap-mil-2mfp/aap-mil-3mfp/aap-mil-4mfp','Second floor of East Sibley, near digital fabrication lab (previously Milstein Hall - Behind the elevators (2nd floor))','campus-bw, campus-color','42.451232','-76.4836401',{0:[0,600],1:[0,600],2:[0,600],3:[0,600],4:[0,600],5:[0,600],6:[0,600]}],
    ['aap-nyc-1c','NYTech (direct print; card reader?)','campus-bw, campus-color', '40.755805', '-73.956233' ,null], 
    ['aap-nyc-1mfp','AAP NYC','campus-color','40.705446', '-74.012886', null],
    ['aap-rome-1c','Rome - Italy','campus-bw, campus-color','41.893970', '12.474946',null], 
    ['aap-sib-1c','Sibley Hall - 3rd Floor Lab (Barclay Jones); bldg open 24/7','campus-bw, campus-color','42.4509802','-76.4840158',null],
    ['aap-sib-3c','Sibley Hall - 2nd Floor Lab (ADMS) (direct print; card reader?); bldg open 24/7','campus-bw, campus-color','42.4509802','-76.4840158',null],
    ['aap-sib-3mfp/aap-sib-4c','Sibley Hall - 3rd Floor Balcony (inside dome) (direct print; card reader?); bldg open 24/7','campus-bw, campus-color','42.4509802','-76.4840158',null],
    ['aap-tjaden-1c','Tjaden Hall - Take elev. to 2W (broken as of spr 2019; direct print or card reader)','campus-bw, campus-color','42.4509025','-76.4853131',{0:[9,16],1:[9,16],2:[9,16],3:[9,16],4:[9,16],5:[0,0],6:[0,0]}],
    ['aep-netprint1','Clark Hall - Room 244 (AEP only) (direct print; card reader?)','campus-bw, campus-color','42.4497606','-76.4812001',null,],
    ['africana-1st-floor','Africana first floor','campus-bw, campus-color','42.457403','-76.482239',{0:[9,23],1:[9,23],2:[9,23],3:[9,23],4:[9,17],5:[13,17],6:[16,23]}],
    ['bin-color','Statler Hall 365 - by the lab monitor desk - closest to window','campus-bw, campus-color',42.445524, -76.482054,null],
    // ['catherwood-library1','Catherwood Library','campus-bw, campus-color','42.4472562','-76.4811158',null], // redundant I think
    ['catherwood-np4c','Catherwood Library - 236 Ives Hall - Reference Area','campus-bw, campus-color','42.4472562','-76.4811158',null],
    ['cbs-olin-basement-2c','Olin Library - basement','campus-bw, campus-color','42.447905','-76.484293',{0:[8,26],1:[8,26],2:[8,26],3:[8,26],4:[8,22],5:[10,22],6:[10,26]}],
    ['cit-carp-2c','Carpenter Hall Computer Lab - Main Floor','campus-bw, campus-color','42.444767','-76.484124',{0:[0,600],1:[0,600],2:[0,600],3:[0,600],4:[0,600],5:[0,600],6:[0,600]}],
    ['cit-mann220a-3c','Mann Library Computer Lab - Room 220A - Second Floor','campus-bw, campus-color','42.448766','-76.476312',{0:[8,24],1:[8,24],2:[8,24],3:[8,24],4:[8,18],5:[12,19],6:[12,24]}],
    ['cit-ph318-3c','Phillips Hall Computer Lab - Room 318','campus-bw, campus-color','42.4445768','-76.4820529',null],
    ['cit-rpcc-3c','Robert Purcell Community Center - RPCC - Computer Lab - Room 207','campus-bw, campus-color',42.455927, -76.477516,{0:[9,23.99],1:[9,23.99],2:[9,23.99],3:[9,23.99],4:[9,23.99],5:[11,23.99],6:[12,23.99]}],
    ['cit-upson-3c','Upson Hall - Room 225','campus-bw, campus-color','42.4439852','-76.4828736',null],
    ['cit-uris-4c','Uris Library - Tower Room Computer Lab - Downstairs from Entrance','campus-bw, campus-color',42.447700, -76.485246,{0:[8,25],1:[8,25],2:[8,25],3:[8,25],4:[8,21],5:[12,21],6:[10,25]}],
    ['cit-weill-1c','B25 Weill Hall - 237 Tower Road','campus-bw, campus-color','42.4468068','-76.477214',null],
    ['cit-wsh-3c','Willard Straight Hall - Computer Lab - Basement Level','campus-bw, campus-color','42.4465919','-76.4856765',{0:[9,16],1:[9,16],2:[9,16],3:[9,16],4:[9,16],5:[0,-1],6:[0,-1]}],
    ['ciw1','District of Columbia - Cornell in Washington','campus-bw, campus-color','38.908391', '-77.048506',null], 
    ['csmenglab/mpslab','Gates Hall - Room G23 (direct print; card reader? under construction as of Spr 2019)','campus-bw, campus-color','42.4449769','-76.4810912',null],
    ['fine-lib2c; sibley1-b56','Fine Arts Library - B56 Sibley Hall','campus-bw, campus-color','42.4512236','-76.4828622',{0:[9,19],1:[9,19],2:[9,19],3:[9,19],4:[9,17],5:[12,17],6:[13,19]}], // might still be under construction idk
    ['hollister2c','Hollister 202 CEE Undergrad Lounge (direct print; card reader?)','campus-bw, campus-color','42.444368','-76.4846392',null],
    ['kroch-lib-2-mfp/kroch-lib-3-mfp','Kroch Library','campus-bw, campus-color','42.447774','-76.484160',{0:[8,26],1:[8,26],2:[8,26],3:[8,26],4:[8,22],5:[10,22],6:[10,26]}],
    ['lacolor1','Kennedy Hall - Room 467 (direct print; card reader?)','campus-bw, campus-color','42.4482603','-76.4793974',null],
    ['law-mfp1','Law ("law-mfp1")','campus-bw, campus-color','42.4438549','-76.4857724',{0:[8,20],1:[8,20],2:[8,20],3:[8,20],4:[8,17],5:[11,17],6:[12,20]}],
    ['lincoln-2floor','Lincoln - second floor (music library)','campus-bw, campus-color','42.4501817','-76.4833675',{0:[9.0,22.0],1:[9.0,22.0],2:[9.0,22.0],3:[9.0,22.0],4:[9.0,17.0],5:[12.0,5.0],6:[14.0,22.0]}],
    ['mann-mfp1/mann-mfp2','Mann ("mann-mfp1")','campus-bw, campus-color','42.448766','-76.4763118',{0:[8,24],1:[8,24],2:[8,24],3:[8,24],4:[8,18],5:[12,19],6:[12,24]}],
    ['mann4c','Mann Library - First Floor','campus-bw, campus-color','42.448766','-76.4763118',{0:[8,24],1:[8,24],2:[8,24],3:[8,24],4:[8,18],5:[12,19],6:[12,24]}],
    ['mann5color','Mann Library - Basement B30 Area','campus-bw, campus-color','42.448766','-76.4763118',{0:[8,22],1:[8,22],2:[8,22],3:[8,22],4:[8,17],5:[0,0],6:[0,0]}],
    ['math-lib3c','Mallott Hall - Math Library - Fourth Floor','campus-bw, campus-color','42.4482224','-76.4802083',{0:[8,20],1:[8,20],2:[8,20],3:[8,20],4:[8,20],5:[0,0],6:[13,22]}],
    ['mth-color','Myron Taylor Hall 2nd Floor Computer Lab (direct print; card reader?)','campus-bw, campus-color','42.444460','-76.486113',null],
    ['nytech-netprnt1','Roosevelt Island - Bloomberg Center Room 181 (direct print; card reader?)','campus-color','40.755641', '-73.956093',null], 
    ['nytech-netprnt2','NYTech - 111 8th Avenue (direct print; card reader?)','campus-color','40.741472', '-74.003385',null], 
    ['olin-lib-4thfloor','Olin Library - Room 425 - Fourth Floor','campus-bw, campus-color','42.447905','-76.484293',{0:[8,26],1:[8,26],2:[8,26],3:[8,26],4:[8,22],5:[10,22],6:[10,26]}],
    ['olin-lib-gradlounge','Olin Library Graduate Lounge','campus-bw, campus-color','42.447905','-76.484293',{0:[8,26],1:[8,26],2:[8,26],3:[8,26],4:[8,22],5:[10,22],6:[10,26]}],
    ['olin-lib5c','Olin Library - MOVED to downstairs in stacks','campus-bw, campus-color','42.447905','-76.484293',{0:[8,26],1:[8,26],2:[8,26],3:[8,26],4:[8,22],5:[10,22],6:[10,26]}],
    ['physci-lib1','Clark Hall - Physical Sciences Library','campus-bw, campus-color','42.4497606','-76.4812001',{0:[0,1000],1:[0,1000],2:[0,1000],3:[0,1000],4:[0,1000],5:[0,1000],6:[0,1000]}], // was in bw
    ['sage-301-color','Sage Hall johnson Library - Room 302 - Third Floor Collaboration Space','campus-bw, campus-color','42.4458947','-76.4832581',null],
    ['sage-lib1-color','Sage Hall - johnson Library - First Floor','campus-bw, campus-color','42.4458918','-76.4833009',null],
    ['sage-mfp1','Sage Hall Johnson library First Floor Room 101','campus-bw, campus-color','42.445897', '-76.483259',null],
    ['sage-mfp2/sage-mfp3','Sage Hall ("sage-mfp2")','campus-bw, campus-color','42.4459','-76.4832',null],
    ['scl-malott','Mallot ("scl-malott")','campus-bw, campus-color','42.4482224','-76.4802083',null],
    ['sha-mslc-color','Nestle Library - west side of reference desk','campus-bw, campus-color',42.445553, -76.482130,null],
    // ['sibley1-b56','Sibley (b56?) bldg open 24/7','campus-bw, campus-color','42.4509802','-76.4840158',null], // duplicate
    ['sips-ps170-1c','Plant Science Building - Room 170','campus-bw, campus-color','42.4483258','-76.4770262',null],
    ['uris-lib-mfp1','Uris Library Austen Room','campus-bw, campus-color',42.447727, -76.485350,{0:[8,25],1:[8,25],2:[8,25],3:[8,25],4:[8,21],5:[12,21],6:[10,25]}],
    ['uris-lib-mfp2','Uris Main Library (direct print; card reader?)','campus-color',42.447727, -76.485350,{0:[8,25],1:[8,25],2:[8,25],3:[8,25],4:[8,21],5:[12,21],6:[10,25]}],
    ['uris-lib2c','Uris Library - In Front of Circulation Desk','campus-bw, campus-color',42.447727, -76.485350,{0:[8,25],1:[8,25],2:[8,25],3:[8,25],4:[8,21],5:[12,21],6:[10,25]}],
    ['vetlib2, vetlib5','Schurman Hall - S1201 (direct print; card reader?)','campus-bw, campus-color','42.4480179','-76.4661765',{0:[7.5,23],1:[7.5,23],2:[7.5,23],3:[7.5,23],4:[7.5,20],5:[10,20],6:[10,23]}],
    ['vetschool-library1','Vet School Library','campus-bw, campus-color','42.4474921','-76.4658424',{0:[7.5,23],1:[7.5,23],2:[7.5,23],3:[7.5,23],4:[7.5,20],5:[10,20],6:[10,23]}]

]
