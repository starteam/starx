define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.model1 = {
        "genetics": {
            "visualizer": { "name": "fly" },
            "genome": {
                "chromosomes": {
                    "C_1": {
                        "name": "Chromosome 1",
                        "genes": [
                            { "name": "red_eyes",
                                "position": 25,
                                "alleles": [
                                    { "name": "A" },
                                    { "name": "a" }
                                ]
                            },
                            { "name": "wingless",
                                "position": 40,
                                "alleles": [
                                    { "name": "B" },
                                    { "name": "b" }
                                ]
                            }
                        ]
                    }
                }
            },
            "engine": {
                "sex_type": "XY",
                "male_recombination_rate": 1,
                "female_recombination_rate": 1,
                "female_sex_ratio": .51,
                "twinning": 0,
                "identical_twins_frequency": 0,
                "avg_offspring_count": 50
            },
            "experiments": {},
            "phenotype_rules": [
                { name: 'default',
                    matches: '*',
                    phenotype: {
                        bodycolor: {
                            text: 'yellow',
                            value: 'yellow'
                        },
                        eyecolor: {
                            text: 'Red',
                            value: 'red'
                        }
                    }
                },
                {
                    name: 'white eyes',
                    matches: 'a,a',
                    phenotype: {
                        bodycolor: {
                            text: 'white',
                            value: 'white'
                        }
                    }
                },
                {
                    name: 'wingless',
                    matches: 'b,b',
                    phenotype: {
                        eyecolor: {
                            text: 'White',
                            value: 'white'
                        }
                    }
                }
            ],
            "gel_rules": {},
            "model_metadata": {},
            "strains": {
                "initial": {
                    "name": "Initial Strains",
                    "list": [
                        { "name": "Wildtype M", "sex": "M", "alleles": ["A,A", "B,B"] },
                        { "name": "Wildtype F", "sex": "F", "alleles": ["A,A", "B,B"] },
                        { "name": "Double Mutant M", "sex": "M", "alleles": ["a,a", "b,b"] },
                        { "name": "Double Mutant F", "sex": "F", "alleles": ["a,a", "b,b"] }
                    ]
                }
            }
        }
    };
    exports.yeast = {
        "genetics": {
            "visualizer": { "name": "yeast" },
            "engine": {
                "sex_type": "Aa",
                "avg_offspring_count": 10
            },
            "genome": {
                "chromosomes": {
                    "C1": {
                        "name": "Chromosome 1",
                        "genes": [
                            { "name": "LEU2",
                                "position": 0,
                                "alleles": [
                                    { "name": "LEU2-3" },
                                    { "name": "leu2-3" }
                                ]
                            },
                            { "name": "LEU2.1",
                                "position": 5,
                                "alleles": [
                                    { "name": "LEU2-112" },
                                    { "name": "leu2-112" }
                                ]
                            }
                        ]
                    },
                    "C2": {
                        "name": "Chromosome 2",
                        "genes": [
                            { "name": "LEUX",
                                "position": 0,
                                "alleles": [
                                    { "name": "LEUX" },
                                    { "name": "leux" }
                                ]
                            }
                        ]
                    },
                    "C4": {
                        "name": "Chromosome 4",
                        "genes": [
                            { "name": "TRP1",
                                "position": 0,
                                "alleles": [
                                    { "name": "TRP1" },
                                    { "name": "trp1" }
                                ]
                            }
                        ]
                    },
                    "C3": {
                        "name": "Chromosome 3",
                        "genes": [
                            { "name": "ADE1",
                                "position": 0,
                                "alleles": [
                                    { "name": "ADE1" },
                                    { "name": "ade1" }
                                ]
                            }
                        ]
                    },
                    "C7": {
                        "name": "Chromosome 7",
                        "genes": [
                            { "name": "COX4",
                                "position": 0,
                                "alleles": [
                                    { "name": "COX4" },
                                    { "name": "cox4" }
                                ]
                            }
                        ]
                    },
                    "C5": {
                        "name": "Chromosome 5",
                        "genes": [
                            { "name": "PET1",
                                "position": 0,
                                "alleles": [
                                    { "name": "PET1" },
                                    { "name": "pet1" }
                                ]
                            }
                        ]
                    },
                    "C10": {
                        "name": "Chromosome 10",
                        "genes": [
                            { "name": "LYS9",
                                "position": 0,
                                "alleles": [
                                    { "name": "LYS9" },
                                    { "name": "lys9" }
                                ]
                            }
                        ]
                    }
                } },
            "experiments": {},
            "phenotype_rules": [
                {
                    name: 'leu2-3',
                    matches: 'leu2-3;haploid',
                    phenotype: {
                        "-Leu": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'leu2-112',
                    matches: 'leu2-112;haploid',
                    phenotype: {
                        "-Leu": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'leux',
                    matches: 'leux;haploid',
                    phenotype: {
                        "-Leu": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'leu2-3 diploid',
                    matches: 'leu2-3,leu2-3',
                    phenotype: {
                        "-Leu": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'leu2-112 diploid',
                    matches: 'leu2-112,leu2-112',
                    phenotype: {
                        "-Leu": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'leux diploid',
                    matches: 'leux,leux',
                    phenotype: {
                        "-Leu": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'leu2 broken',
                    matches: 'leu2-3 LEU2-112,LEU2-3 leu2-112',
                    phenotype: {
                        "-Leu": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'trp1',
                    matches: 'trp1;haploid',
                    phenotype: {
                        "-Trp": {
                            "growth": .1
                        },
                        "-Trp -Lys": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'trp1 diploid',
                    matches: 'trp1,trp1',
                    phenotype: {
                        "-Trp": {
                            "growth": .1
                        },
                        "-Trp -Lys": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'ade1',
                    matches: 'ade1;haploid',
                    phenotype: {
                        "Complete": {
                            "color": "red"
                        },
                        "YPG": {
                            "color": "red"
                        },
                        "-Leu": {
                            "color": "red"
                        },
                        "-Ade": {
                            "color": "red",
                            "growth": .1
                        },
                        "-Lys": {
                            "color": "red"
                        },
                        "-Trp": {
                            "color": "red"
                        },
                        "-Trp -Lys": {
                            "color": "red"
                        }
                    }
                },
                {
                    name: 'ade1 diploid',
                    matches: 'ade1,ade1',
                    phenotype: {
                        "Complete": {
                            "color": "red"
                        },
                        "YPG": {
                            "color": "red"
                        },
                        "-Leu": {
                            "color": "red"
                        },
                        "-Ade": {
                            "color": "red",
                            "growth": .1
                        },
                        "-Lys": {
                            "color": "red"
                        },
                        "-Trp": {
                            "color": "red"
                        },
                        "-Trp -Lys": {
                            "color": "red"
                        }
                    }
                },
                {
                    "name": "cox4",
                    "matches": "cox4;haploid",
                    "phenotype": {
                        "Complete": {
                            "size": .25
                        },
                        "YPG": {
                            "size": .25,
                            "growth": .1
                        },
                        "-Leu": {
                            "size": .25
                        },
                        "-Ade": {
                            "size": .25
                        },
                        "-Lys": {
                            "size": .25
                        },
                        "-Trp": {
                            "size": .25
                        },
                        "-Lys -Trp": {
                            "size": .25
                        }
                    }
                },
                {
                    "name": "cox4 diploid",
                    "matches": "cox4;cox4",
                    "phenotype": {
                        "Complete": {
                            "size": .25
                        },
                        "YPG": {
                            "size": .25,
                            "growth": .1
                        },
                        "-Leu": {
                            "size": .25
                        },
                        "-Ade": {
                            "size": .25
                        },
                        "-Lys": {
                            "size": .25
                        },
                        "-Trp": {
                            "size": .25
                        },
                        "-Lys -Trp": {
                            "size": .25
                        }
                    }
                },
                {
                    "name": "pet1",
                    "matches": "pet1;haploid",
                    "phenotype": {
                        "Complete": {
                            "size": .25
                        },
                        "YPG": {
                            "size": .25,
                            "growth": .1
                        },
                        "-Leu": {
                            "size": .25
                        },
                        "-Ade": {
                            "size": .25
                        },
                        "-Lys": {
                            "size": .25
                        },
                        "-Trp": {
                            "size": .25
                        },
                        "-Lys -Trp": {
                            "size": .25
                        }
                    }
                },
                {
                    "name": "pet1 diploid",
                    "matches": "pet1,pet1",
                    "phenotype": {
                        "Complete": {
                            "size": .25
                        },
                        "YPG": {
                            "size": .25,
                            "growth": .1
                        },
                        "-Leu": {
                            "size": .25
                        },
                        "-Ade": {
                            "size": .25
                        },
                        "-Lys": {
                            "size": .25
                        },
                        "-Trp": {
                            "size": .25
                        },
                        "-Lys -Trp": {
                            "size": .25
                        }
                    }
                },
                {
                    name: 'lys9',
                    matches: 'lys9;haploid',
                    phenotype: {
                        "-Lys": {
                            "growth": .1
                        },
                        "-Trp -Lys": {
                            "growth": .1
                        }
                    }
                },
                {
                    name: 'lys9 diploid',
                    matches: 'lys9',
                    phenotype: {
                        "-Lys": {
                            "growth": .1
                        },
                        "-Trp -Lys": {
                            "growth": .1
                        }
                    }
                }
            ],
            "gel_rules": {},
            "model_metadata": {},
            "strains": {
                "initial": {
                    "name": "Initial Strains",
                    "list": [
                        { "name": "Strain 1", "sex": "a", "alleles": ["leu2-3", "LEU2-112", "LEUX", "ADE1", "COX4", "PET1", "LYS9", "trp1"] },
                        { "name": "Strain 2", "sex": "alpha", "alleles": ["LEU2-3", "leu2-112", "LEUX", "ADE1", "COX4", "PET1", "LYS9", "trp1"] },
                        { "name": "Strain 3", "sex": "alpha", "alleles": ["LEU2-3", "LEU2-112", "leux", "ADE1", "COX4", "PET1", "LYS9", "trp1"] },
                        { "name": "Strain 4", "sex": "a", "alleles": ["LEU2-3", "LEU2-112", "LEUX", "ade1", "COX4", "PET1", "LYS9", "TRP1"] },
                        { "name": "Strain 5", "sex": "a", "alleles": ["LEU2-3", "LEU2-112", "LEUX", "ADE1", "cox4", "PET1", "LYS9", "TRP1"] },
                        { "name": "Strain 6", "sex": "alpha", "alleles": ["LEU2-3", "LEU2-112", "LEUX", "ADE1", "COX4", "pet1", "LYS9", "TRP1"] },
                        { "name": "MATa tester", "sex": "a", "alleles": ["LEU2-3", "LEU2-112", "LEUX", "ADE1", "COX4", "PET1", "lys9", "TRP1"] },
                        { "name": "MATalpha tester", "sex": "alpha", "alleles": ["LEU2-3", "LEU2-112", "LEUX", "ADE1", "COX4", "PET1", "lys9", "TRP1"] }
                    ]
                }
            }
        }
    };
    exports.tutorial = {
        "ui": {
            "title": "Tutorial Exercise"
        },
        "genetics": {
            "visualizer": { "name": "fly" },
            "genome": {
                "chromosomes": {
                    "X": {
                        "name": "Chromosome X",
                        "genes": [
                            { "name": "Body Color",
                                "position": 40,
                                "alleles": [
                                    { "name": "B" },
                                    { "name": "b" }
                                ]
                            }
                        ]
                    }
                }
            },
            "engine": {
                "sex_type": "XY",
                "male_recombination_rate": 1,
                "female_recombination_rate": 1,
                "female_sex_ratio": .51,
                "twinning": 0,
                "identical_twins_frequency": 0,
                "avg_offspring_count": 50
            },
            "experiments": {},
            "phenotype_rules": [
                { name: 'default',
                    matches: '*',
                    phenotype: {
                        "bodycolor": {
                            text: 'Wild type',
                            value: 'rgb(152,118,84)'
                        }
                    }
                },
                {
                    name: 'Gray body (F)',
                    matches: 'Sex:FEMALE;b,b',
                    phenotype: {
                        "bodycolor": {
                            text: 'Gray',
                            value: 'gray'
                        }
                    }
                },
                {
                    name: 'Gray body (M)',
                    matches: 'Sex:MALE;b',
                    phenotype: {
                        bodycolor: {
                            text: 'Gray',
                            value: 'gray'
                        }
                    }
                }
            ],
            "gel_rules": {},
            "model_metadata": {},
            "strains": {
                "initial": {
                    "name": "Initial Strains",
                    "list": [
                        { "name": "Mutant 1", "sex": "M", "alleles": ["b"] },
                        { "name": "Wild type M", "sex": "M", "alleles": ["B"] },
                        { "name": "Wild type F", "sex": "F", "alleles": ["B,B"] }
                    ]
                }
            }
        }
    };
    //## Fruit Fly Exercise 5
    //## https://starwiki.mit.edu/media_files/uploads/genetics/excel_workbooks/fruit_fly_exercise_5_ver2.xls
    exports.fruit_fly_exercise_5 = {
        "genetics": {
            "visualizer": { "name": "fly" },
            "genome": {
                "chromosomes": {
                    "C_1": {
                        "name": "Chromosome 2",
                        "genes": [
                            { "name": "Brown body - dominant",
                                "position": 0,
                                "alleles": [
                                    { "name": "B" },
                                    { "name": "b" }
                                ]
                            },
                            { "name": "Long artisae - dominant",
                                "position": 25,
                                "alleles": [
                                    { "name": "A" },
                                    { "name": "a" }
                                ]
                            },
                            { "name": "Wingless - recessive",
                                "position": 55,
                                "alleles": [
                                    { "name": "W" },
                                    { "name": "w" }
                                ]
                            }
                        ]
                    }
                }
            },
            "engine": {
                "sex_type": "XY",
                "male_recombination_rate": 1,
                "female_recombination_rate": 1,
                "female_sex_ratio": .50,
                "twinning": 0,
                "identical_twins_frequency": 0,
                "avg_offspring_count": 100
            },
            "experiments": {},
            "phenotype_rules": [
                { name: 'default',
                    matches: '*',
                    phenotype: {
                        bodycolor: {
                            text: 'wildtype',
                            value: 'rgb(152,118,84)'
                        },
                        aristae: {
                            text: 'wildtype',
                            value: '1'
                        },
                        wingsize: {
                            text: 'wildtype',
                            value: '1'
                        }
                    }
                },
                {
                    name: 'Aristae',
                    matches: 'a,a',
                    phenotype: {
                        aristae: {
                            text: 'none',
                            value: '0'
                        }
                    }
                },
                {
                    name: 'Wingless',
                    matches: 'w,w',
                    phenotype: {
                        wingsize: {
                            text: 'wingless',
                            value: '0'
                        }
                    }
                },
                {
                    name: 'Body color',
                    matches: 'b,b',
                    phenotype: {
                        bodycolor: {
                            text: 'gray',
                            value: 'gray'
                        }
                    }
                }
            ],
            "gel_rules": {},
            "model_metadata": {},
            "strains": {
                "initial": {
                    "name": "Initial Strains",
                    "list": [
                        //   {"name": "Test M", "sex":"M", "alleles": [ "B,b", "A,a", "W,W"]},
                        //   {"name": "Test F", "sex":"F", "alleles": [ "B,b", "A,a", "W,W"]},
                        { "name": "Fly 1", "sex": "M", "alleles": ["B,B", "A,A", "w,w"] },
                        { "name": "Fly 2", "sex": "F", "alleles": ["b,b", "A,A", "W,W"] },
                        { "name": "Fly 3", "sex": "M", "alleles": ["B,B", "a,a", "W,W"] },
                        { "name": "Fly 4", "sex": "F", "alleles": ["B,B", "A,A", "w,w"] },
                        { "name": "Fly 5", "sex": "M", "alleles": ["B,B", "a,a", "W,W"] },
                        { "name": "Fly 6", "sex": "F", "alleles": ["b,b", "A,A", "W,W"] },
                        { "name": "Fly 7", "sex": "F", "alleles": ["b,b", "A,A", "w,w"] },
                        { "name": "Fly 8", "sex": "F", "alleles": ["B,B", "a,a", "w,w"] },
                        { "name": "Fly 9", "sex": "F", "alleles": ["b,b", "a,a", "W,W"] }
                    ]
                }
            }
        }
    };
    exports.fruit_fly_exercise_1 = {
        "genetics": {
            "visualizer": { "name": "fly" },
            "engine": {
                "sex_type": "XY",
                "male_recombination_rate": 0,
                "female_recombination_rate": 1,
                "female_sex_ratio": .50,
                "twinning": 0,
                "identical_twins_frequency": 0,
                "avg_offspring_count": 100
            },
            "genome": {
                "chromosomes": {
                    "C_1": {
                        "name": "Chromosome 3",
                        "genes": [
                            { "name": "Wingless - dominant",
                                "position": 0,
                                "alleles": [
                                    { "name": "G" },
                                    { "name": "g" }
                                ]
                            }
                        ]
                    }
                }
            },
            "experiments": {},
            "phenotype_rules": [
                { name: 'default',
                    matches: '*',
                    phenotype: {
                        bodycolor: {
                            text: 'wildtype',
                            value: 'rgb(152,118,84)'
                        },
                        wingsize: {
                            text: 'wildtype',
                            value: '1'
                        }
                    }
                },
                {
                    name: 'Winged',
                    matches: 'G',
                    phenotype: {
                        wingsize: {
                            text: 'grounded',
                            value: '0'
                        }
                    }
                },
                {
                    name: 'Lethal',
                    matches: 'G,G',
                    phenotype: {
                        lethal: true
                    }
                }
            ],
            "gel_rules": {},
            "model_metadata": {},
            "strains": {
                "initial": {
                    "name": "Initial Strains",
                    "list": [
                        { "name": "Wildtype M", "sex": "M", "alleles": ["g,g"] },
                        { "name": "Wildtype F", "sex": "F", "alleles": ["g,g"] },
                        //    {"name": "Grounded M", "sex": "M", "alleles": [ "G,g" ]},
                        { "name": "Grounded", "sex": "F", "alleles": ["G,g"] }
                    ]
                }
            }
        }
    };
    // 7QBW EX5
    exports.fruit_fly_exercise_7QBW_mapping_exercise = {
        "genetics": {
            "visualizer": { "name": "fly" },
            "genome": {
                "chromosomes": {
                    "C_1": {
                        "name": "Chromosome 2",
                        "genes": [
                            { "name": "Brown body - dominant",
                                "position": 0,
                                "alleles": [
                                    { "name": "B" },
                                    { "name": "b" }
                                ]
                            },
                            { "name": "Long artisae - dominant",
                                "position": 8,
                                "alleles": [
                                    { "name": "A" },
                                    { "name": "a" }
                                ]
                            },
                            { "name": "Wingless - recessive",
                                "position": 15,
                                "alleles": [
                                    { "name": "W" },
                                    { "name": "w" }
                                ]
                            }
                        ]
                    }
                }
            },
            "engine": {
                "sex_type": "XY",
                "male_recombination_rate": 1,
                "female_recombination_rate": 1,
                "female_sex_ratio": .50,
                "twinning": 0,
                "identical_twins_frequency": 0,
                "avg_offspring_count": 100
            },
            "experiments": {},
            "phenotype_rules": [
                { name: 'default',
                    matches: '*',
                    phenotype: {
                        bodycolor: {
                            text: 'wildtype',
                            value: 'rgb(152,118,84)'
                        },
                        aristae: {
                            text: 'wildtype',
                            value: '1'
                        },
                        wingsize: {
                            text: 'wildtype',
                            value: '1'
                        }
                    }
                },
                {
                    name: 'Aristae',
                    matches: 'a,a',
                    phenotype: {
                        aristae: {
                            text: 'none',
                            value: '0'
                        }
                    }
                },
                {
                    name: 'Wingless',
                    matches: 'w,w',
                    phenotype: {
                        wingsize: {
                            text: 'wingless',
                            value: '0'
                        }
                    }
                },
                {
                    name: 'Body color',
                    matches: 'b,b',
                    phenotype: {
                        bodycolor: {
                            text: 'gray',
                            value: 'gray'
                        }
                    }
                }
            ],
            "gel_rules": {},
            "model_metadata": {},
            "strains": {
                "initial": {
                    "name": "Initial Strains",
                    "list": [
                        //   {"name": "Test M", "sex":"M", "alleles": [ "B,b", "A,a", "W,W"]},
                        //   {"name": "Test F", "sex":"F", "alleles": [ "B,b", "A,a", "W,W"]},
                        { "name": "Fly 1", "sex": "M", "alleles": ["B,B", "A,A", "w,w"] },
                        { "name": "Fly 2", "sex": "F", "alleles": ["b,b", "A,A", "W,W"] },
                        { "name": "Fly 3", "sex": "M", "alleles": ["B,B", "a,a", "W,W"] },
                        { "name": "Fly 4", "sex": "F", "alleles": ["B,B", "A,A", "w,w"] },
                        { "name": "Fly 5", "sex": "M", "alleles": ["B,B", "a,a", "W,W"] },
                        { "name": "Fly 6", "sex": "F", "alleles": ["b,b", "A,A", "W,W"] },
                        { "name": "Fly 7", "sex": "F", "alleles": ["b,b", "A,A", "w,w"] },
                        { "name": "Fly 8", "sex": "F", "alleles": ["B,B", "a,a", "w,w"] },
                        { "name": "Fly 9", "sex": "F", "alleles": ["b,b", "a,a", "W,W"] }
                    ]
                }
            }
        }
    };
});
//# sourceMappingURL=bundled_samples.js.map