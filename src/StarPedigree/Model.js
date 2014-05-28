define(["require", "exports"], function(require, exports) {
    exports.model1 = {
        ui: {
            sexes: [
                { 'id': 'F', 'kind': 'female' },
                { 'id': 'M', 'kind': 'male' }
            ],
            markers: [
                { 'id': 'H', name: "Huntington's", 'kind': 'fill', 'color': 'black' },
                { 'id': 'A', 'name': 'SSR37 A', 'kind': 'label' },
                { 'id': 'B', 'name': 'SSR37 B', 'kind': 'label' },
                { 'id': 'C', 'name': 'SSR37 C', 'kind': 'label' },
                { 'id': 'D', 'name': 'SSR37 D', 'kind': 'label' }
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
    };
});
//# sourceMappingURL=Model.js.map
