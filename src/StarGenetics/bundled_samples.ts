export var model1 = {
    "genetics": {
        "visualizer": {"name": "fly"},
        "genome": {
            "chromosomes": {
                "C_1": {
                    "name": "Chromosome 1",
                    "genes": [
                        { "name": "red_eyes",
                            "position": 25,
                            "alleles": [
                                {"name": "A"},
                                {"name": "a"}
                            ]
                        },
                        { "name": "wingless",
                            "position": 40,
                            "alleles": [
                                {"name": "B"},
                                {"name": "b"}
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
            {   name: 'default',
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
                    {"name": "Wildtype M", "sex": "M", "alleles": [ "A,A" , "B,B" ]},
                    {"name": "Wildtype F", "sex": "F", "alleles": [ "A,A" , "B,B" ]},
                    {"name": "Double Mutant M", "sex": "M", "alleles": [ "a,a" , "b,b" ]},
                    {"name": "Double Mutant F", "sex": "F", "alleles": [ "a,a" , "b,b" ]}
                ]
            }
        }
    }
}

export var tutorial = {
    "genetics": {
        "visualizer": {"name": "fly"},
        "genome": {
            "chromosomes": {
                "C_1": {
                    "name": "Chromosome X",
                    "genes": [
                        { "name": "Body Color",
                            "position": 40,
                            "alleles": [
                                {"name": "B"},
                                {"name": "b"}
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
            {   name: 'default',
                matches: '*',
                phenotype: {
                    bodycolor: {
                        text: 'wildtype',
                        value: 'rgb(152,118,84)'
                    },
                }
            },
            {
                name: 'Gray body (F)',
                matches: 'Sex:FEMALE;b,b',
                phenotype: {
                    bodycolor: {
                        text: 'gray',
                        value: 'gray'
                    }
                }
            },
            {
                name: 'Gray body (M)',
                matches: 'Sex:MALE;b',
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
                    {"name": "Mutant 1", "sex": "M", "alleles": [ "b" ]},
                    {"name": "Wildtype M", "sex": "M", "alleles": [ "B,B" ]},
                    {"name": "Wildtype F", "sex": "F", "alleles": [ "B" ]}
                ]
            }
        }
    }
}

//## Fruit Fly Exercise 5
//## https://starwiki.mit.edu/media_files/uploads/genetics/excel_workbooks/fruit_fly_exercise_5_ver2.xls


    export var fruit_fly_exercise_5 = {
        "genetics": {
            "visualizer": {"name": "fly"},
            "genome": {
                "chromosomes": {
                    "C_1": {
                        "name": "Chromosome X",
                        "genes": [
                            { "name": "Brown body - dominant",
                                "position": 0,
                                "alleles": [
                                    {"name": "B"},
                                    {"name": "b"}
                                ]
                            },
                            { "name": "Long artisae - dominant",
                                "position": 75,
                                "alleles": [
                                    {"name": "A"},
                                    {"name": "a"}
                                ]
                            },
                            { "name": "Wingless - recessive",
                                "position": 150,
                                "alleles": [
                                    {"name": "W"},
                                    {"name": "w"}
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
                {   name: 'default',
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
                            text: 'missing',
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
                        {"name": "Fly 1", "sex": "M", "alleles": [ "B,B","A,A","w,w" ]},
                        {"name": "Fly 2", "sex": "F", "alleles": [ "b,b","A,A","W,W" ]},
                        {"name": "Fly 3", "sex": "M", "alleles": [ "B,B","a,a","W,W" ]},
                        {"name": "Fly 4", "sex": "F", "alleles": [ "B,B","A,A","w,w" ]},
                        {"name": "Fly 5", "sex": "M", "alleles": [ "B,B","a,a","W,W" ]},
                        {"name": "Fly 6", "sex": "F", "alleles": [ "b,b","A,A","W,W" ]},
                        {"name": "Fly 7", "sex": "F", "alleles": [ "b,b","A,A","w,w" ]},
                        {"name": "Fly 8", "sex": "F", "alleles": [ "B,B","a,a","w,w" ]},
                        {"name": "Fly 9", "sex": "F", "alleles": [ "b,b","a,a","W,W" ]}
                    ]
                }
            }
        }
    }
