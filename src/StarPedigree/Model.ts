export var model1 = {
    ui: {
        sexes: [
            { 'id': 'F', 'kind': 'female' },
            { 'id': 'M', 'kind': 'male' }
        ],
        markers: [
            {'id': 'H', name: "Huntington's", 'kind': 'fill', 'color': 'black'},
            {'id': 'A', 'name': 'SSR37 A', 'kind': 'label'},
            {'id': 'B', 'name': 'SSR37 B', 'kind': 'label'},
            {'id': 'C', 'name': 'SSR37 C', 'kind': 'label'},
            {'id': 'D', 'name': 'SSR37 D', 'kind': 'label'}
        ],
        individuals: [
            {
                'id': 'I-1',
                'sex': 'F',
                'markers': ['H', 'A'],
                'location': {
                    'row': 1,
                    'column': 1
                }
            },
            {
                'id': 'I-2',
                'sex': 'M',
                'markers': ['C', 'D'],
                'location': {
                    'row': 1,
                    'column': 6
                }
            },
            {
                'id': 'II-1',
                'sex': 'F',
                'markers': ['H', 'C'],
                'location': {
                    'row': 2,
                    'column': 2
                }
            },
            {
                'id': 'II-2',
                'sex': 'F',
                'markers': ['A', 'D'],
                'location': {
                    'row': 2,
                    'column': 3
                }
            },
            {
                'id': 'II-3',
                'sex': 'M',
                'markers': ['H', 'C'],
                'location': {
                    'row': 2,
                    'column': 4
                }
            },
            {
                'id': 'II-4',
                'sex': 'M',
                'markers': ['A', 'D'],
                'location': {
                    'row': 2,
                    'column': 5
                }
            }
        ],
        relationships: [
            {
                'id': 'GenI-1,2',
                'parents': ['I-1', 'I-2'],
                'children': ['II-1', 'II-2', 'II-3', 'II-4']
            }
        ],
        options: {
            'layout': 'grid',
            'cell_width': 80,
            'cell_height': 80,
            'cell_offset_x': 50,
            'cell_offset_y': 50,
            'generations': ['', 'I', 'II'],
            'symbol_markers': ['H']

        }
    }
}

export var model_h = {
    ui: {
        sexes: [
            { 'id': 'F', 'kind': 'female' },
            { 'id': 'M', 'kind': 'male' }
        ],
        markers: [
            {'id': 'H', name: "Huntington's", 'kind': 'fill', 'color': 'black'},
        ],
        individuals: [
            // gen 1
            {
                'id': 'I-1',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 1,
                    'column': 9
                }
            },
            {
                'id': 'I-2',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 1,
                    'column': 10
                }
            },
            // gen 2
            {
                'id': 'II-1',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 2,
                    'column': 5
                }
            },
            {
                'id': 'II-2',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 2,
                    'column': 6
                }
            },
            {
                'id': 'II-3',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 2,
                    'column': 13.5
                }
            },
            {
                'id': 'II-4',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 2,
                    'column': 14.5
                }
            },
            // gen 3
            {
                'id': 'III-1',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 3,
                    'column': 1.5
                }
            },
            {
                'id': 'III-2',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 3,
                    'column': 2.5
                }
            },
            {
                'id': 'III-3',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 3,
                    'column': 7.5
                }
            },
            {
                'id': 'III-4',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 3,
                    'column': 8.5
                }
            },
            {
                'id': 'III-5',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 3,
                    'column': 14
                }
            },
            {
                'id': 'III-6',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 3,
                    'column': 15
                }
            },
            // gen 4
            {
                'id': 'IV-1',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 4,
                    'column': 2
                }
            },
            {
                'id': 'IV-2',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 4,
                    'column': 3
                }
            },
            {
                'id': 'IV-3',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 4,
                    'column': 8
                }
            },
            {
                'id': 'IV-4',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 4,
                    'column': 9
                }
            },
            {
                'id': 'IV-5',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 4,
                    'column': 12
                }
            },
            {
                'id': 'IV-6',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 4,
                    'column': 13
                }
            },
            {
                'id': 'IV-7',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 4,
                    'column': 17
                }
            },
            {
                'id': 'IV-8',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 4,
                    'column': 18
                }
            },
            {
                'id': 'IV-9',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 4,
                    'column': 20
                }
            },
            {
                'id': 'IV-10',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 4,
                    'column': 24
                }
            },
            {
                'id': 'IV-11',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 4,
                    'column': 25
                }
            },
            // gen 5
            {
                'id': 'V-1',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 1
                }
            },
            {
                'id': 'V-2',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 2
                }
            },
            {
                'id': 'V-3',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 5,
                    'column': 3
                }
            },
            {
                'id': 'V-4',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 4
                }
            },
            {
                'id': 'V-5',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 5,
                    'column': 8
                }
            },
            {
                'id': 'V-6',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 9
                }
            },
            {
                'id': 'V-7',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 10
                }
            },
            {
                'id': 'V-8',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 5,
                    'column': 11
                }
            },
            {
                'id': 'V-9',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 12
                }
            },
            {
                'id': 'V-10',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 13
                }
            },
            {
                'id': 'V-11',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 14
                }
            },
            {
                'id': 'V-12',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 15
                }
            },
            {
                'id': 'V-13',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 5,
                    'column': 16
                }
            },
            {
                'id': 'V-14',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 17
                }
            },
            {
                'id': 'V-15',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 18
                }
            },
            {
                'id': 'V-16',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 5,
                    'column': 19
                }
            },
            {
                'id': 'V-17',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 20
                }
            },
            {
                'id': 'V-18',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 5,
                    'column': 21
                }
            },
            {
                'id': 'V-19',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 5,
                    'column': 22
                }
            },
            {
                'id': 'V-20',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 23
                }
            },
            {
                'id': 'V-21',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 5,
                    'column': 24
                }
            },
            {
                'id': 'V-22',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 25
                }
            },
            {
                'id': 'V-23',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 5,
                    'column': 26
                }
            },
            {
                'id': 'V-24',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 5,
                    'column': 27
                }
            },
            // gen 6
            {
                'id': 'VI-1',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 6,
                    'column': 1
                }
            },
            {
                'id': 'VI-2',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 6,
                    'column': 2
                }
            },
            {
                'id': 'VI-3',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 6,
                    'column': 3
                }
            },
            {
                'id': 'VI-4',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 6,
                    'column': 4
                }
            },
            {
                'id': 'VI-5',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 6,
                    'column': 5
                }
            },
            {
                'id': 'VI-6',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 6,
                    'column': 6
                }
            },
            {
                'id': 'VI-7',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 6,
                    'column': 7
                }
            },
            {
                'id': 'VI-8',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 6,
                    'column': 8
                }
            },
            {
                'id': 'VI-9',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 6,
                    'column': 9
                }
            },
            {
                'id': 'VI-10',
                'sex': 'M',
                'markers': [],
                'location': {
                    'row': 6,
                    'column': 10
                }
            },
            {
                'id': 'VI-11',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 6,
                    'column': 11
                }
            },
            {
                'id': 'VI-12',
                'sex': 'F',
                'markers': [],
                'location': {
                    'row': 6,
                    'column': 12
                }
            },
            {
                'id': 'VI-13',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 6,
                    'column': 19
                }
            },
            {
                'id': 'VI-14',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 6,
                    'column': 20
                }
            },
            {
                'id': 'VI-15',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 6,
                    'column': 24.5
                }
            },
            // gen 7
                        {
                'id': 'VII-1',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 7,
                    'column': 1
                }
            },
            {
                'id': 'VII-2',
                'sex': 'M',
                'markers': ['H'],
                'location': {
                    'row': 7,
                    'column': 2
                }
            },
            {
                'id': 'VII-3',
                'sex': 'F',
                'markers': ['H'],
                'location': {
                    'row': 7,
                    'column': 8.5
                }
            }
        ],
        relationships: [
            {
                'id': 'GenI-1,2',
                'parents': ['I-1', 'I-2'],
                'children': ['II-1', 'II-3']
            },
            {
                'id': 'GenII-1,2',
                'parents': ['II-1', 'II-2'],
                'children': ['III-1', 'III-3']
            },
            {
                'id': 'GenII-3,4',
                'parents': ['II-3', 'II-4'],
                'children': ['III-5']
            },
            {
                'id': 'GenIII-1,2',
                'parents': ['III-1', 'III-2'],
                'children': ['IV-1']
            },
            {
                'id': 'GenIII-3,4',
                'parents': ['III-3', 'III-4'],
                'children': ['IV-3']
            },
            {
                'id': 'GenIII-5,6',
                'parents': ['III-5', 'III-6'],
                'children': ['IV-5', 'IV-7', 'IV-9', 'IV-10']
            },
            {
                'id': 'GenIV-1,2',
                'parents': ['IV-1', 'IV-2'],
                'children': ['V-1', 'V-2', 'V-3']
            },
            {
                'id': 'GenIV-3,4',
                'parents': ['IV-3', 'IV-4'],
                'children': ['V-5', 'V-6', 'V-7']
            },
            {
                'id': 'GenIV-5,6',
                'parents': ['IV-5', 'IV-6'],
                'children': ['V-8', 'V-9', 'V-10', 'V-11']
            },
            {
                'id': 'GenIV-7,8',
                'parents': ['IV-7', 'IV-8'],
                'children': ['V-12', 'V-13', 'V-14', 'V-15', 'V-16', 'V-18', 'V-19', 'V-20']
            },
            {
                'id': 'GenIV-10,11',
                'parents': ['IV-10', 'IV-11'],
                'children': ['V-21', 'V-23', 'V-24']
            },
            {
                'id': 'GenV-3,4',
                'parents': ['V-3', 'V-4'],
                'children': ['VI-1', 'VI-3', 'VI-4', 'VI-5', 'VI-6', 'VI-7']
            },
            {
                'id': 'GenV-5,6',
                'parents': ['V-5', 'V-6'],
                'children': ['VI-8', 'VI-10', 'VI-11', 'VI-12']
            },
            {
                'id': 'GenV-16,17',
                'parents': ['V-16', 'V-17'],
                'children': ['VI-13', 'VI-14']
            },
            {
                'id': 'GenV-21,22',
                'parents': ['V-21', 'V-22'],
                'children': ['VI-15']
            },
            {
                'id': 'GenVI-1,2',
                'parents': ['VI-1', 'VI-2'],
                'children': ['VII-1', 'VII-2']
            },
            {
                'id': 'GenVI-8,9',
                'parents': ['VI-8', 'VI-9'],
                'children': ['VII-3']
            },
        ],
        options: {
            'layout': 'grid',
            'cell_width': 80,
            'cell_height': 80,
            'cell_offset_x': 50,
            'cell_offset_y': 50,
            'generations': ['', 'I', 'II'],
            'symbol_markers': ['H']

        }
    }}

window['__model_h'] = model_h;