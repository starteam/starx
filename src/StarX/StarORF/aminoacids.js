define(function () {
    return {
        Ala: {
            shortName: "A",
            codes: ["GCU", "GCC", "GCA", "GCG"],
            type: "Nonpolar",
            longName: "Alanine"}, //
        Leu: {
            shortName: "L",
            codes: ["UUA", "UUG", "CUU", "CUC", "CUA", "CUG"],
            type: "Nonpolar",
            longName: "Leucine"}, //
        Arg: {
            shortName: "R",
            codes: ["CGU", "CGC", "CGA", "CGG", "AGA", "AGG"],
            type: "Polar",
            longName: "Arginine"}, //
        Lys: {
            shortName: "K",
            codes: ["AAA", "AAG"],
            type: "Basic",
            longName: "Lysine"}, //
        Asn: {
            shortName: "N",
            codes: ["AAU", "AAC"],
            type: "Polar",
            longName: "Asparagine"}, //
        Met: {
            shortName: "M",
            codes: ["AUG"],
            type: "Nonpolar",
            longName: "Methionine"}, //
        Asp: {
            shortName: "D",
            codes: ["GAU", "GAC"],
            type: "Nonpolar",
            longName: "Aspartic acid"}, //
        Phe: {
            shortName: "F",
            codes: ["UUU", "UUC"],
            type: "Nonpolar",
            longName: "Phenylalanine"}, //
        Cys: {
            shortName: "C",
            codes: ["UGU", "UGC"],
            type: "Polar",
            longName: "Cysteine"}, //
        Pro: {
            shortName: "P",
            codes: ["CCU", "CCC", "CCA", "CCG"],
            type: "Nonpolar",
            longName: "Proline"}, //
        Gln: {
            shortName: "Q",
            codes: ["CAA", "CAG"],
            type: "Polar",
            longName: "Glutamine"}, //
        Ser: {
            shortName: "S",
            codes: ["UCU", "UCC", "UCA", "UCG", "AGU", "AGC"],
            type: "Polar",
            longName: "Serine"}, //
        Glu: {
            shortName: "E",
            codes: ["GAA", "GAG"],
            type: "Nonpolar",
            longName: "Glutamic acid"}, //
        Thr: {
            shortName: "T",
            codes: ["ACU", "ACC", "ACA", "ACG"],
            type: "Polar",
            longName: "Threonine"}, //
        Gly: {
            shortName: "G",
            codes: ["GGU", "GGC", "GGA", "GGG"],
            type: "Polar",
            longName: "Glycine"}, //
        Trp: {
            shortName: "W",
            codes: ["UGG"],
            type: "Nonpolar",
            longName: "Tryptophan"}, //
        His: {
            shortName: "H",
            codes: ["CAU", "CAC"],
            type: "Basic",
            longName: "Histidine"}, //
        Tyr: {
            shortName: "Y",
            codes: ["UAU", "UAC"],
            type: "Polar",
            longName: "Tyrosine"}, //
        Ile: {
            shortName: "I",
            codes: ["AUU", "AUC", "AUA"],
            type: "Nonpolar",
            longName: "Isoleucine"}, //
        Val: {
            shortName: "V",
            codes: ["GUU", "GUC", "GUA", "GUG"],
            type: "Nonpolar",
            longName: "Valine"}, //
        START: {
            shortName: "START",
            codes: ["AUG"],
            type: "START",
            longName: "Methionine"}, //
        STOP: {
            shortName: "STOP",
            codes: ["UAG", "UGA", "UAA"],
            type: "STOP",
            longName: "Stop codon"} //
    }
});