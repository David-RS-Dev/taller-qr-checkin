/**
 * ============================================================
 * FRENO PERFECTO - SISTEMA DE VALIDACIÓN Y COTIZACIÓN
 * Archivo: freno-perfecto.js
 * Descripción: Sistema para clasificar vehículos y generar 
 *              cotizaciones automáticas según el menú de precios.
 * ============================================================
 */

// ============================================================
// 1. BASE DE DATOS DE VEHÍCULOS POR MARCA Y MODELO
// ============================================================
const vehicleData = {
    // === MARCAS PREMIUM (siempre tarifa PREMIUM) ===
    "BMW": [
        "Serie 1", "116i", "118i", "120i",
        "Serie 2", "220i", "228i", "M235i",
        "Serie 3", "318i", "320i", "325i", "328i", "330i", "M340i", "M3",
        "Serie 4", "420i", "428i", "430i", "M440i", "M4",
        "Serie 5", "520i", "525i", "528i", "530i", "535i", "540i", "M550i",
        "Serie 6", "630i", "640i", "M850i",
        "Serie 7", "730i", "740i", "745i", "750i", "760i",
        "Serie 8", "840i", "M850i", "M8",
        "X1", "sDrive18i", "xDrive20i", "xDrive25i", "M35i",
        "X2", "sDrive18i", "xDrive20i", "xDrive28i", "M35i",
        "X3", "xDrive20i", "xDrive28i", "xDrive30i", "M40i",
        "X4", "xDrive20i", "xDrive30i", "M40i",
        "X5", "xDrive30i", "xDrive40i", "xDrive45e", "M50i", "X5 M",
        "X6", "xDrive30i", "xDrive40i", "M50i", "X6 M",
        "X7", "xDrive40i", "xDrive50i", "M60i",
        "Z3", "Z4", "Z8",
        "i3", "i4", "i7", "i8", "iX",
        "330e", "530e", "740e"
    ],
    
    "Mercedes-Benz": [
        "Clase A", "A180", "A200", "A220", "A250", "AMG A35", "AMG A45",
        "Clase B", "B180", "B200", "B220", "B250",
        "CLA", "CLA180", "CLA200", "CLA250", "CLA35 AMG", "CLA45 AMG",
        "CLS", "CLS350", "CLS400", "CLS450", "CLS53 AMG",
        "Clase C", "C180", "C200", "C220", "C230", "C250", "C280", "C300", "C350", "C400", "C43 AMG", "C63 AMG",
        "Clase E", "E180", "E200", "E220", "E230", "E240", "E250", "E270", "E280", "E300", "E320", "E350", "E400", "E43 AMG", "E53 AMG", "E63 AMG",
        "Clase S", "S280", "S300", "S320", "S350", "S400", "S430", "S450", "S500", "S550", "S560", "S580", "S600", "S63 AMG", "S65 AMG",
        "Maybach S560", "Maybach S680",
        "GLA", "GLA180", "GLA200", "GLA220", "GLA250", "GLA35 AMG", "GLA45 AMG",
        "GLB", "GLB200", "GLB220", "GLB250", "GLB35 AMG",
        "GLC", "GLC200", "GLC220", "GLC250", "GLC300", "GLC350e", "GLC43 AMG", "GLC63 AMG",
        "GLE", "GLE350", "GLE400", "GLE43 AMG", "GLE450", "GLE53 AMG", "GLE580", "GLE63 AMG",
        "GLS", "GLS350d", "GLS400", "GLS450", "GLS500", "GLS550", "GLS580", "GLS63 AMG",
        "Maybach GLS600",
        "Clase G", "G350d", "G400", "G500", "G550", "G55 AMG", "G63 AMG", "G65 AMG",
        "Clase M", "ML320", "ML350", "ML400", "ML430", "ML450", "ML500", "ML550", "ML63 AMG",
        "GLK", "GLK220", "GLK250", "GLK280", "GLK300", "GLK350",
        "Clase R", "R320", "R350", "R500",
        "SLK", "SLC", "SLK200", "SLK230", "SLK250", "SLK300", "SLK350", "SLK55 AMG",
        "SLC200", "SLC300", "SLC43 AMG",
        "SL", "SL280", "SL300", "SL320", "SL350", "SL400", "SL450", "SL500", "SL550", "SL55 AMG", "SL63 AMG", "SL65 AMG",
        "SLS AMG", "AMG GT", "AMG GT S", "AMG GT R",
        "Clase V", "V220d", "V250", "V250d", "V300d",
        "Vito", "Sprinter"
    ],
    
    "Audi": [
        "A1", "1.0 TFSI", "1.4 TFSI", "1.8 TFSI", "2.0 TFSI", "S1", "RS1",
        "A3", "1.4 TFSI", "1.8 TFSI", "2.0 TFSI", "2.0 TDI", "S3", "RS3",
        "A4", "1.4 TFSI", "1.8 TFSI", "2.0 TFSI", "2.0 TDI", "2.5 TFSI", "3.0 TFSI", "3.2 FSI", "S4", "RS4",
        "A5", "1.8 TFSI", "2.0 TFSI", "2.0 TDI", "3.0 TFSI", "3.2 FSI", "S5", "RS5",
        "A6", "2.0 TFSI", "2.0 TDI", "2.4", "2.5 TFSI", "2.8 FSI", "3.0 TFSI", "3.0 TDI", "3.2 FSI", "4.2 FSI", "S6", "RS6",
        "A7", "2.0 TFSI", "3.0 TFSI", "3.0 TDI", "4.0 TFSI", "S7", "RS7",
        "A8", "3.0 TFSI", "3.0 TDI", "4.0 TFSI", "4.2 FSI", "6.0 W12", "6.3 FSI", "S8", "S8 Plus",
        "Q2", "1.0 TFSI", "1.4 TFSI", "2.0 TFSI", "2.0 TDI", "SQ2",
        "Q3", "1.4 TFSI", "2.0 TFSI", "2.0 TDI", "2.5 TFSI", "RS Q3",
        "Q5", "2.0 TFSI", "2.0 TDI", "3.0 TFSI", "3.0 TDI", "SQ5", "RS Q5",
        "Q7", "3.0 TFSI", "3.0 TDI", "3.6 FSI", "4.2 FSI", "4.2 TDI", "SQ7", "SQ7 TDI",
        "Q8", "55 TFSI", "60 TFSI", "50 TDI", "SQ8", "SQ8 TDI", "RS Q8",
        "E-Tron", "Q4 E-Tron", "E-Tron GT", "Q8 E-Tron",
        "TT", "1.8 TFSI", "2.0 TFSI", "2.0 TDI", "2.5 TFSI", "3.2 VR6", "TTS", "TT RS",
        "R8", "4.2 FSI V8", "5.2 FSI V10", "R8 V10 Plus", "R8 V10 Performance", "R8 Spyder"
    ],
    
    "Porsche": [
        "Cayenne", "Cayenne Coupe", "Cayenne S", "Cayenne Turbo", "Cayenne E-Hybrid",
        "Macan", "Macan S", "Macan GTS", "Macan Turbo",
        "Panamera", "Panamera 4", "Panamera S", "Panamera Turbo", "Panamera E-Hybrid",
        "911", "911 Carrera", "911 Carrera S", "911 Turbo", "911 GT3", "911 GT3 RS", "911 Targa",
        "718 Boxster", "718 Cayman", "718 Spyder", "718 GT4",
        "Taycan", "Taycan 4S", "Taycan Turbo", "Taycan Turbo S",
        "Cayenne GTS", "Macan Electric"
    ],
    
    "Lexus": [
        "RX", "RX 350", "RX 450h", "RX 500h",
        "NX", "NX 250", "NX 350h", "NX 450h+",
        "GX", "GX 460", "GX 550",
        "LX", "LX 570", "LX 600",
        "ES", "ES 250", "ES 300h", "ES 350",
        "IS", "IS 300", "IS 350", "IS 500",
        "LS", "LS 500", "LS 500h",
        "UX", "UX 200", "UX 250h",
        "RC", "RC 300", "RC 350", "RC F",
        "LC", "LC 500", "LC 500h",
        "LFA"
    ],
    
    "Infiniti": [
        "Q50", "Q50 2.0t", "Q50 3.0t", "Q50 Red Sport",
        "Q60", "Q60 2.0t", "Q60 3.0t", "Q60 Red Sport",
        "Q70", "Q70 3.7", "Q70 5.6",
        "QX30",
        "QX50", "QX50 2.0t",
        "QX60", "QX60 2.5t", "QX60 3.5",
        "QX70", "QX70 3.7",
        "QX80", "QX80 5.6"
    ],
    
    "Volvo": [
        "XC40", "XC40 B3", "XC40 B4", "XC40 B5", "XC40 Recharge",
        "XC60", "XC60 B4", "XC60 B5", "XC60 T8 Recharge",
        "XC90", "XC90 B5", "XC90 B6", "XC90 T8 Recharge",
        "S60", "S60 B4", "S60 B5", "S60 T8 Recharge",
        "S90", "S90 B5", "S90 T8 Recharge",
        "V60", "V60 B4", "V60 B5", "V60 T8 Recharge",
        "V90", "V90 B5", "V90 Cross Country",
        "C40", "C40 Recharge",
        "S40", "V40", "XC70", "V70", "S80"
    ],
    
    "Land Rover": [
        "Range Rover", "Range Rover P400", "Range Rover P440e", "Range Rover P530",
        "Range Rover Sport", "Range Rover Sport P400", "Range Rover Sport P530",
        "Range Rover Velar", "Range Rover Velar P250", "Range Rover Velar P400",
        "Range Rover Evoque", "Range Rover Evoque P250", "Range Rover Evoque P300e",
        "Discovery", "Discovery P360", "Discovery P300",
        "Discovery Sport", "Discovery Sport P250", "Discovery Sport P300e",
        "Defender", "Defender 90", "Defender 110", "Defender 130",
        "Defender P300", "Defender P400", "Defender P525",
        "Freelander"
    ],
    
    "Jaguar": [
        "F-Pace", "F-Pace P250", "F-Pace P400", "F-Pace SVR",
        "E-Pace", "E-Pace P200", "E-Pace P250", "E-Pace P300e",
        "I-Pace", "I-Pace EV400",
        "XE", "XE P250", "XE P300",
        "XF", "XF P250", "XF P300",
        "F-Type", "F-Type P300", "F-Type P450", "F-Type R", "F-Type SVR",
        "XJ", "XJL", "XJR"
    ],
    
    "Cadillac": [
        "Escalade", "Escalade 6.2", "Escalade-V",
        "XT4", "XT4 2.0T",
        "XT5", "XT5 2.0T", "XT5 3.6",
        "XT6", "XT6 2.0T", "XT6 3.6",
        "CT4", "CT4 2.0T", "CT4-V", "CT4-V Blackwing",
        "CT5", "CT5 2.0T", "CT5 3.0T", "CT5-V", "CT5-V Blackwing",
        "CT6", "CT6 2.0T", "CT6 3.6",
        "ATS", "ATS 2.0T", "ATS-V",
        "CTS", "CTS 2.0T", "CTS 3.6", "CTS-V",
        "SRX", "XTS"
    ],
    
    "Alfa Romeo": [
        "Giulia", "Giulia 2.0T", "Giulia Quadrifoglio",
        "Stelvio", "Stelvio 2.0T", "Stelvio Quadrifoglio",
        "Giulietta", "Giulietta 1.4T", "Giulietta 2.0JTD",
        "4C", "4C Spider",
        "8C", "8C Competizione",
        "MiTo", "MiTo 1.4T"
    ],
    
    "Genesis": [
        "G70", "G70 2.0T", "G70 2.5T", "G70 3.3T",
        "G80", "G80 2.5T", "G80 3.5T",
        "G90", "G90 3.5T", "G90 5.0",
        "GV60",
        "GV70", "GV70 2.5T", "GV70 3.5T",
        "GV80", "GV80 2.5T", "GV80 3.5T"
    ],
    
    "MINI": [
        "Cooper", "Cooper S", "Cooper SE", "John Cooper Works",
        "Countryman", "Countryman S", "Countryman SE", "Countryman JCW",
        "Clubman", "Clubman S", "Clubman JCW",
        "Convertible", "Convertible S", "Convertible JCW",
        "Paceman", "Paceman S",
        "Coupe", "Coupe S", "Coupe JCW",
        "Roadster", "Roadster S", "Roadster JCW"
    ],
    
    "Acura": [
        "MDX", "MDX 3.5", "MDX Type S",
        "RDX", "RDX 2.0T",
        "TLX", "TLX 2.0T", "TLX Type S",
        "ILX", "ILX 2.4",
        "RLX", "RLX 3.5", "RLX Sport Hybrid",
        "NSX",
        "Integra", "Integra Type S",
        "CDX", "ZDX"
    ],
    
    "Exeed": ["LX", "TXL", "VX", "RX", "ET"],
    "Tank": ["300", "500", "700", "800"],
    
    "BYD": [
        "Han", "Han EV", "Han DM",
        "Tang", "Tang EV", "Tang DM",
        "Song", "Song Plus", "Song Pro",
        "Yuan", "Yuan Plus", "Yuan Pro",
        "Qin", "Qin Plus",
        "Dolphin",
        "Seal", "Seal U",
        "Atto 3",
        "e6", "e2", "e3"
    ],

    // === MARCAS GENERALISTAS (categoría por tamaño) ===
    "Chevrolet": [
        "Spark", "Spark GT", "Spark Life",
        "Aveo", "Aveo Family", "Aveo GT",
        "Sail", "Sail LT", "Sail LTZ",
        "Optra", "Optra Advance",
        "Cruze", "Cruze LT", "Cruze Premier",
        "Malibu", "Malibu LT", "Malibu Premier",
        "Tracker", "Tracker LT", "Tracker Premier",
        "Onix", "Onix LT", "Onix Premier",
        "Captiva", "Captiva LT", "Captiva LTZ", "Captiva Sport", "Captiva XL",
        "Equinox", "Equinox LT", "Equinox Premier",
        "Blazer", "Blazer RS", "Blazer Premier",
        "Trax", "Trax LT", "Trax Premier",
        "Trailblazer", "Trailblazer LT", "Trailblazer RS",
        "Tahoe", "Tahoe LT", "Tahoe Premier", "Tahoe Z71",
        "Suburban", "Suburban LT", "Suburban Premier", "Suburban Z71",
        "Traverse", "Traverse LT", "Traverse Premier",
        "Colorado", "Colorado LT", "Colorado Z71", "Colorado High Country",
        "Silverado", "Silverado 1500", "Silverado 2500HD", "Silverado 3500HD",
        "LUV D-Max", "D-Max", "D-Max LTZ", "D-Max High Country",
        "S-10", "S-10 LS", "S-10 LTZ",
        "Camaro", "Camaro LT", "Camaro SS", "Camaro ZL1",
        "Corvette", "Corvette Stingray", "Corvette Z06",
        "Montana", "Montana LT", "Montana Premier",
        "N300", "N300 Max",
        "Enjoy", "Enjoy LTZ"
    ],
    
    "Ford": [
        "Fiesta", "Fiesta SE", "Fiesta Titanium", "Fiesta ST",
        "Focus", "Focus SE", "Focus Titanium", "Focus ST", "Focus RS",
        "Fusion", "Fusion SE", "Fusion Titanium", "Fusion Sport",
        "Mustang", "Mustang GT", "Mustang EcoBoost", "Mustang Mach 1", "Mustang Shelby GT500",
        "EcoSport", "EcoSport SE", "EcoSport Titanium",
        "Escape", "Escape SE", "Escape Titanium", "Escape Hybrid",
        "Edge", "Edge SE", "Edge Titanium", "Edge ST",
        "Explorer", "Explorer XLT", "Explorer Limited", "Explorer ST", "Explorer Platinum",
        "Expedition", "Expedition XLT", "Expedition Limited", "Expedition Platinum",
        "Bronco", "Bronco Big Bend", "Bronco Black Diamond", "Bronco Badlands", "Bronco Raptor",
        "Bronco Sport", "Bronco Sport Big Bend", "Bronco Sport Badlands",
        "Ranger", "Ranger XL", "Ranger XLT", "Ranger Lariat", "Ranger Wildtrak", "Ranger Raptor",
        "F-150", "F-150 XL", "F-150 XLT", "F-150 Lariat", "F-150 King Ranch", "F-150 Platinum", "F-150 Raptor",
        "Maverick", "Maverick XL", "Maverick XLT", "Maverick Lariat",
        "Super Duty", "F-250", "F-250 XL", "F-250 XLT", "F-250 Lariat", "F-350", "F-350 XL", "F-350 XLT", "F-350 Lariat",
        "Transit", "Transit Connect", "Transit Van", "Transit Passenger Wagon",
        "E-Series", "E-150", "E-250", "E-350"
    ],
    
    "Toyota": [
        "Yaris", "Yaris L", "Yaris S", "Yaris SE",
        "Vios", "Vios E", "Vios G",
        "Etios", "Etios Liva",
        "Corolla", "Corolla LE", "Corolla SE", "Corolla XSE", "Corolla Hybrid",
        "Camry", "Camry LE", "Camry SE", "Camry XSE", "Camry Hybrid",
        "Avalon", "Avalon XLE", "Avalon Limited",
        "Prius", "Prius LE", "Prius XLE", "Prius Prime",
        "RAV4", "RAV4 LE", "RAV4 XLE", "RAV4 Limited", "RAV4 Hybrid", "RAV4 TRD",
        "C-HR", "C-HR LE", "C-HR XLE",
        "Highlander", "Highlander LE", "Highlander XLE", "Highlander Limited", "Highlander Hybrid",
        "4Runner", "4Runner SR5", "4Runner TRD Pro", "4Runner Limited", "4Runner TRD Off-Road",
        "Sequoia", "Sequoia SR5", "Sequoia Limited", "Sequoia Platinum", "Sequoia TRD Pro",
        "Fortuner", "Fortuner SRV", "Fortuner SRX",
        "Hilux", "Hilux SR", "Hilux SRV", "Hilux SRX", "Hilux Revo", "Hilux GR Sport",
        "Tacoma", "Tacoma SR", "Tacoma SR5", "Tacoma TRD Sport", "Tacoma TRD Off-Road", "Tacoma TRD Pro",
        "Tundra", "Tundra SR", "Tundra SR5", "Tundra Limited", "Tundra Platinum", "Tundra TRD Pro",
        "Land Cruiser", "Land Cruiser 200", "Land Cruiser 250", "Land Cruiser 300",
        "Prado", "Land Cruiser Prado", "Prado TX", "Prado TZ", "Prado VX",
        "Avanza", "Avanza E", "Avanza G",
        "Innova", "Innova G", "Innova V",
        "Hiace", "Hiace Van", "Hiace Commuter",
        "Sienna", "Sienna LE", "Sienna XLE", "Sienna Limited", "Sienna Hybrid"
    ],
    
    "Nissan": [
        "March", "March Active", "March Advance", "March Exclusive",
        "Note", "Note S", "Note X", "Note e-Power",
        "Tiida", "Tiida Convenience", "Tiida Luxury",
        "Versa", "Versa S", "Versa SV", "Versa SR",
        "Sentra", "Sentra S", "Sentra SV", "Sentra SR", "Sentra Turbo",
        "Altima", "Altima S", "Altima SV", "Altima SR", "Altima Platinum",
        "Maxima", "Maxima SV", "Maxima Platinum",
        "370Z", "370Z Sport", "370Z Nismo",
        "GT-R", "GT-R Premium", "GT-R Nismo",
        "Kicks", "Kicks S", "Kicks SV", "Kicks SR",
        "X-Trail", "X-Trail S", "X-Trail SV", "X-Trail SL",
        "Rogue", "Rogue S", "Rogue SV", "Rogue SL",
        "Murano", "Murano S", "Murano SV", "Murano SL", "Murano Platinum",
        "Pathfinder", "Pathfinder S", "Pathfinder SV", "Pathfinder SL", "Pathfinder Platinum",
        "Armada", "Armada SV", "Armada SL", "Armada Platinum",
        "Patrol", "Patrol LE", "Patrol SE", "Patrol Platinum",
        "Juke", "Juke S", "Juke SV", "Juke Nismo",
        "Frontier", "Frontier XE", "Frontier SE", "Frontier LE", "Frontier PRO-4X", "Frontier Desert Runner",
        "NP300", "NP300 XE", "NP300 SE", "NP300 LE",
        "Navara", "Navara XE", "Navara SE", "Navara LE", "Navara PRO-4X",
        "Titan", "Titan S", "Titan SV", "Titan PRO-4X", "Titan Platinum Reserve",
        "Urvan", "Urvan Van", "Urvan Wagon",
        "NV200", "NV2500", "NV3500"
    ],
    
    "Mitsubishi": [
        "Mirage", "Mirage ES", "Mirage SE", "Mirage G4",
        "Lancer", "Lancer ES", "Lancer SE", "Lancer GT", "Lancer Evolution",
        "Galant", "Galant ES", "Galant VR-G",
        "ASX", "ASX ES", "ASX SE", "ASX GT",
        "Outlander", "Outlander ES", "Outlander SE", "Outlander GT", "Outlander PHEV",
        "Eclipse Cross", "Eclipse Cross ES", "Eclipse Cross SE", "Eclipse Cross GT",
        "Montero", "Montero GLS", "Montero Limited", "Montero Sport",
        "Pajero", "Pajero GLS", "Pajero Evolution",
        "Montero Sport", "Montero Sport GLS", "Montero Sport GT",
        "L200", "L200 GL", "L200 GLS", "L200 HPE",
        "Triton", "Triton GL", "Triton GLS", "Triton HPE", "Triton Athlete", "Triton Ralliart",
        "Delica", "Delica Van", "Delica Wagon",
        "L300"
    ],
    
    "Hyundai": [
        "Grand i10", "Grand i10 Prime", "Grand i10 Attitude",
        "i10", "i10 Era", "i10 Magna", "i10 Sportz",
        "i20", "i20 Era", "i20 Magna", "i20 Sportz", "i20 Asta",
        "Accent", "Accent GL", "Accent GLS", "Accent GT",
        "Elantra", "Elantra GL", "Elantra GLS", "Elantra Limited", "Elantra Sport",
        "Sonata", "Sonata GLS", "Sonata Limited", "Sonata Sport", "Sonata Hybrid",
        "Azera", "Azera GLS", "Azera Limited", "Grandeur",
        "Grandeur", "Grandeur GLS", "Grandeur Limited",
        "Venue", "Venue SE", "Venue SEL", "Venue Denim",
        "Creta", "Creta SE", "Creta SEL", "Creta Limited",
        "Tucson", "Tucson GLS", "Tucson Limited", "Tucson Sport", "Tucson Hybrid",
        "Santa Fe", "Santa Fe SE", "Santa Fe SEL", "Santa Fe Limited", "Santa Fe Calligraphy",
        "Grand Santa Fe", "Grand Santa Fe Limited", "Grand Santa Fe Ultimate",
        "Palisade", "Palisade SE", "Palisade SEL", "Palisade Limited", "Palisade Calligraphy",
        "Kona", "Kona SE", "Kona SEL", "Kona Limited", "Kona N",
        "Ioniq", "Ioniq 5", "Ioniq 6",
        "Santa Cruz", "Santa Cruz SE", "Santa Cruz SEL", "Santa Cruz Limited",
        "H100", "H100 Van", "H100 Wagon",
        "Staria", "Staria Van", "Staria Wagon", "Staria Lounge"
    ],
    
    "Kia": [
        "Picanto", "Picanto LX", "Picanto EX", "Picanto SX",
        "Rio", "Rio LX", "Rio EX", "Rio SX",
        "Morning", "Morning LX", "Morning EX",
        "Cerato", "Cerato LX", "Cerato EX", "Cerato SX",
        "Forte", "Forte LX", "Forte EX", "Forte GT",
        "K3", "K3 LX", "K3 EX", "K3 GT",
        "K5", "K5 LX", "K5 EX", "K5 GT", "K5 GT-Line",
        "Optima", "Optima LX", "Optima EX", "Optima SX", "Optima Hybrid",
        "Stinger", "Stinger GT", "Stinger GT-Line",
        "Stonic", "Stonic LX", "Stonic EX",
        "Sonet", "Sonet LX", "Sonet EX", "Sonet SX",
        "Sportage", "Sportage LX", "Sportage EX", "Sportage SX",
        "Seltos", "Seltos LX", "Seltos EX", "Seltos SX", "Seltos S",
        "Sorento", "Sorento LX", "Sorento EX", "Sorento SX",
        "Telluride", "Telluride LX", "Telluride EX", "Telluride SX",
        "Mohave", "Mohave GLS", "Mohave Limited",
        "Tasman", "Tasman DLX", "Tasman LX", "Tasman SX",
        "Carnival", "Carnival LX", "Carnival EX", "Carnival SX",
        "Sedona", "Sedona LX", "Sedona EX", "Sedona SXL",
        "Carens", "Carens LX", "Carens EX"
    ],
    
    "Jeep": [
        "Renegade", "Renegade Sport", "Renegade Latitude", "Renegade Limited", "Renegade Trailhawk",
        "Compass", "Compass Sport", "Compass Latitude", "Compass Limited", "Compass Trailhawk",
        "Cherokee", "Cherokee Latitude", "Cherokee Limited", "Cherokee Trailhawk", "Cherokee Overland",
        "Grand Cherokee", "Grand Cherokee Laredo", "Grand Cherokee Limited", "Grand Cherokee Overland", "Grand Cherokee Summit", "Grand Cherokee Trackhawk",
        "Wagoneer", "Wagoneer Series I", "Wagoneer Series II", "Wagoneer Series III",
        "Grand Wagoneer", "Grand Wagoneer Series I", "Grand Wagoneer Series II", "Grand Wagoneer Series III",
        "Wrangler", "Wrangler Sport", "Wrangler Sahara", "Wrangler Rubicon", "Wrangler Rubicon 392",
        "Gladiator", "Gladiator Sport", "Gladiator Overland", "Gladiator Rubicon", "Gladiator Mojave",
        "Commander", "Commander Limited", "Commander Overland",
        "Liberty", "Liberty Sport", "Liberty Limited",
        "Patriot", "Patriot Sport", "Patriot Limited"
    ],
    
    "Volkswagen": [
        "Polo", "Polo Trendline", "Polo Comfortline", "Polo Highline", "Polo GTI",
        "Virtus", "Virtus Trendline", "Virtus Comfortline", "Virtus Highline", "Virtus GT",
        "Golf", "Golf Trendline", "Golf Comfortline", "Golf Highline", "Golf GTI", "Golf R",
        "Jetta", "Jetta Trendline", "Jetta Comfortline", "Jetta Highline", "Jetta GLI",
        "Passat", "Passat Trendline", "Passat Comfortline", "Passat Highline", "Passat GTE",
        "Bora", "Bora Trendline", "Bora Comfortline", "Bora Highline",
        "Sagitar", "Sagitar GLI",
        "T-Cross", "T-Cross Trendline", "T-Cross Comfortline", "T-Cross Highline",
        "T-Roc", "T-Roc Trendline", "T-Roc Comfortline", "T-Roc R-Line", "T-Roc R",
        "Tiguan", "Tiguan Trendline", "Tiguan Comfortline", "Tiguan Highline", "Tiguan R-Line", "Tiguan Allspace",
        "Taos", "Taos Trendline", "Taos Comfortline", "Taos Highline",
        "Tharu", "Tharu Trendline", "Tharu Comfortline", "Tharu Highline",
        "Teramont", "Teramont Trendline", "Teramont Comfortline", "Teramont Highline",
        "Atlas", "Atlas SE", "Atlas SEL", "Atlas R-Line",
        "Touareg", "Touareg V6", "Touareg V8", "Touareg R-Line",
        "Amarok", "Amarok Trendline", "Amarok Highline", "Amarok V6", "Amarok Aventura",
        "Saveiro", "Saveiro Trendline", "Saveiro Highline",
        "Caddy", "Caddy Van", "Caddy Maxi",
        "Transporter", "Transporter T5", "Transporter T6", "Transporter T7",
        "Multivan", "Multivan T5", "Multivan T6", "Multivan T7",
        "Crafter", "Crafter Van", "Crafter Wagon"
    ],
    
    "Honda": [
        "Fit", "Fit DX", "Fit LX", "Fit EX", "Fit Sport",
        "City", "City DX", "City LX", "City EX", "City Touring",
        "Civic", "Civic LX", "Civic EX", "Civic Touring", "Civic Sport", "Civic Si", "Civic Type R",
        "Accord", "Accord LX", "Accord EX", "Accord Touring", "Accord Sport", "Accord Hybrid",
        "Insight", "Insight LX", "Insight EX", "Insight Touring",
        "HR-V", "HR-V LX", "HR-V EX", "HR-V Touring", "HR-V Sport",
        "WR-V", "WR-V DX", "WR-V EX", "WR-V Touring",
        "CR-V", "CR-V LX", "CR-V EX", "CR-V Touring", "CR-V Hybrid",
        "BR-V", "BR-V S", "BR-V E", "BR-V V", "BR-V Prestige",
        "Pilot", "Pilot LX", "Pilot EX", "Pilot Touring", "Pilot Elite", "Pilot TrailSport",
        "Passport", "Passport LX", "Passport EX-L", "Passport TrailSport",
        "Ridgeline", "Ridgeline RTX", "Ridgeline Sport", "Ridgeline RTL", "Ridgeline TrailSport",
        "Odyssey", "Odyssey LX", "Odyssey EX", "Odyssey Touring", "Odyssey Elite",
        "Element", "Element DX", "Element EX",
        "Mobilio", "Mobilio S", "Mobilio E", "Mobilio RS"
    ],
    
    "Mazda": [
        "Mazda 2", "Mazda 2 Sport", "Mazda 2 Touring", "Mazda 2 Grand Touring",
        "Mazda 3", "Mazda 3 Sport", "Mazda 3 Touring", "Mazda 3 Grand Touring", "Mazda 3 Turbo",
        "Mazda 6", "Mazda 6 Sport", "Mazda 6 Touring", "Mazda 6 Grand Touring", "Mazda 6 Turbo",
        "CX-3", "CX-3 Sport", "CX-3 Touring", "CX-3 Grand Touring",
        "CX-30", "CX-30 Sport", "CX-30 Touring", "CX-30 Premium", "CX-30 Turbo",
        "CX-5", "CX-5 Sport", "CX-5 Touring", "CX-5 Grand Touring", "CX-5 Signature", "CX-5 Turbo",
        "CX-7", "CX-7 Sport", "CX-7 Touring", "CX-7 Grand Touring",
        "CX-9", "CX-9 Sport", "CX-9 Touring", "CX-9 Grand Touring", "CX-9 Signature", "CX-9 Turbo",
        "BT-50", "BT-50 GL", "BT-50 GLS", "BT-50 HPE",
        "MX-5", "MX-5 Sport", "MX-5 Club", "MX-5 Grand Touring", "MX-5 RF",
        "RX-7", "RX-8"
    ],
    
    "Great Wall": [
        "Wingle", "Wingle 3", "Wingle 5", "Wingle 6", "Wingle 7",
        "Poer", "Poer King Kong", "Poer P-Series", "Poer Cannon",
        "Haval H6", "Haval H6 Sport", "Haval H6 GT",
        "Haval H6 HEV", "Haval H6 PHEV",
        "Haval Jolion", "Haval Jolion HEV",
        "Haval Dargo",
        "C30", "C30 Elite", "C30 Premium",
        "C20R", "C20R Cross",
        "Voleex", "Voleex C10", "Voleex C30"
    ],
    
    "JAC": [
        "T6", "T6 GL", "T6 GLS",
        "T8", "T8 Pro", "T8 GL", "T8 GLS",
        "T9", "T9 Hunter", "T9 Pro",
        "Hunter", "Hunter GL", "Hunter GLS",
        "S2", "S2 Luxury",
        "S3", "S3 Luxury", "S3 Elite",
        "S4", "S4 Luxury",
        "S7", "S7 Luxury",
        "JS3", "JS4", "JS6",
        "Refine", "Refine M3", "Refine M4", "Refine M5",
        "J7", "J7 GL", "J7 GLS",
        "A5 Plus", "A5 Plus GL", "A5 Plus GLS"
    ],
    
    "Maxus": [
        "T60", "T60 GLX", "T60 Luxe", "T60 Pioneer",
        "T70", "T70 GLX", "T70 Luxe", "T70 Pioneer", "T70 Adventure",
        "T90", "T90 GLX", "T90 Luxe", "T90 Pioneer",
        "D90", "D90 GLX", "D90 Luxe",
        "RX5", "RX5 GLX", "RX5 Luxe",
        "RX8", "RX8 GLX", "RX8 Luxe",
        "V80", "V80 Van", "V80 Wagon",
        "G10", "G10 Van", "G10 Wagon"
    ],
    
    "Changan": [
        "Hunter", "Hunter GL", "Hunter GLS",
        "CS35", "CS35 Plus",
        "CS55", "CS55 Plus",
        "CS75", "CS75 Plus",
        "CS95",
        "UNI-T", "UNI-K", "UNI-V",
        "Alsvin", "Alsvin Comfort", "Alsvin Luxury",
        "Eado", "Eado Plus"
    ],
    
    "Foton": [
        "Tunland", "Tunland E", "Tuneland S", "Tunland G7",
        "Sauvana", "Sauvana 4x2", "Sauvana 4x4",
        "View", "View CS2", "View CS3",
        "Toano", "Toano Van", "Toano Wagon",
        "Gratour", "Gratour Mini"
    ],
    
    "Chery": [
        "Tiggo 2", "Tiggo 2 Pro",
        "Tiggo 3", "Tiggo 3 Sport",
        "Tiggo 4", "Tiggo 4 Pro",
        "Tiggo 7", "Tiggo 7 Pro", "Tiggo 7 Pro Max",
        "Tiggo 8", "Tiggo 8 Pro", "Tiggo 8 Pro Max", "Tiggo 8 Pro e+",
        "Tiggo 5x", "Tiggo 5x Pro",
        "Arrizo 5", "Arrizo 5 GT",
        "Arrizo 6", "Arrizo 6 GT",
        "Qq", "Qq Ice Cream"
    ],
    
    "Jetour": [
        "X70", "X70 Plus", "X70 Coupe",
        "X70S", "X70S Pro",
        "X90", "X90 Plus",
        "X95",
        "T2", "T2 Traveler",
        "Dashing",
        "Ice Cream"
    ],
    
    "Haval": [
        "H2", "H2S",
        "H6", "H6 GT", "H6 HEV", "H6 PHEV",
        "H9", "H9 Luxe",
        "Jolion", "Jolion HEV",
        "Dargo", "Dargo X"
    ],
    
    "BAIC": [
        "BJ40", "BJ40 Plus", "BJ40 Ring Tower",
        "BJ80",
        "X35", "X55", "X75"
    ]
};


// ============================================================
// 2. LISTA DE MARCAS PREMIUM
// ============================================================
const PREMIUM_BRANDS = [
    "BMW", "Mercedes-Benz", "Audi", "Porsche", "Lexus", "Infiniti",
    "Volvo", "Land Rover", "Jaguar", "Cadillac", "Alfa Romeo", "Genesis",
    "MINI", "Acura", "Exeed", "Tank", "BYD"
];


// ============================================================
// 3. CLASIFICACIÓN POR TAMAÑO (MARCAS GENERALISTAS)
// ============================================================
const vehicleSizeCategories = {
    small: {
        "Chevrolet": ["Spark", "Spark GT", "Spark Life", "Aveo", "Aveo Family", "Aveo GT"],
        "Ford": ["Fiesta", "Fiesta SE", "Fiesta Titanium", "Fiesta ST"],
        "Toyota": ["Yaris", "Yaris L", "Yaris S", "Yaris SE", "Vios", "Vios E", "Vios G", "Etios", "Etios Liva"],
        "Nissan": ["March", "March Active", "March Advance", "March Exclusive", "Note", "Note S", "Note X", "Note e-Power", "Tiida", "Tiida Convenience", "Tiida Luxury", "Versa", "Versa S", "Versa SV", "Versa SR"],
        "Mitsubishi": ["Mirage", "Mirage ES", "Mirage SE", "Mirage G4"],
        "Hyundai": ["Grand i10", "Grand i10 Prime", "Grand i10 Attitude", "i10", "i10 Era", "i10 Magna", "i10 Sportz", "i20", "i20 Era", "i20 Magna", "i20 Sportz", "i20 Asta", "Accent", "Accent GL", "Accent GLS", "Accent GT"],
        "Kia": ["Picanto", "Picanto LX", "Picanto EX", "Picanto SX", "Rio", "Rio LX", "Rio EX", "Rio SX", "Morning", "Morning LX", "Morning EX"],
        "Volkswagen": ["Polo", "Polo Trendline", "Polo Comfortline", "Polo Highline", "Polo GTI", "Virtus", "Virtus Trendline", "Virtus Comfortline", "Virtus Highline", "Virtus GT"],
        "Honda": ["Fit", "Fit DX", "Fit LX", "Fit EX", "Fit Sport", "City", "City DX", "City LX", "City EX", "City Touring"],
        "Mazda": ["Mazda 2", "Mazda 2 Sport", "Mazda 2 Touring", "Mazda 2 Grand Touring"],
        "Great Wall": ["C30", "C30 Elite", "C30 Premium", "C20R", "C20R Cross", "Voleex", "Voleex C10", "Voleex C30"],
        "JAC": ["J7", "J7 GL", "J7 GLS", "A5 Plus", "A5 Plus GL", "A5 Plus GLS"],
        "Changan": ["Alsvin", "Alsvin Comfort", "Alsvin Luxury", "Eado", "Eado Plus"],
        "Chery": ["Qq", "Qq Ice Cream"],
        "Jetour": ["Ice Cream"]
    },
    
    sedan: {
        "Chevrolet": ["Cruze", "Cruze LT", "Cruze Premier", "Malibu", "Malibu LT", "Malibu Premier", "Optra", "Optra Advance"],
        "Ford": ["Focus", "Focus SE", "Focus Titanium", "Focus ST", "Focus RS", "Fusion", "Fusion SE", "Fusion Titanium", "Fusion Sport"],
        "Toyota": ["Corolla", "Corolla LE", "Corolla SE", "Corolla XSE", "Corolla Hybrid", "Camry", "Camry LE", "Camry SE", "Camry XSE", "Camry Hybrid", "Avalon", "Avalon XLE", "Avalon Limited", "Prius", "Prius LE", "Prius XLE", "Prius Prime"],
        "Nissan": ["Sentra", "Sentra S", "Sentra SV", "Sentra SR", "Sentra Turbo", "Altima", "Altima S", "Altima SV", "Altima SR", "Altima Platinum", "Maxima", "Maxima SV", "Maxima Platinum"],
        "Mitsubishi": ["Lancer", "Lancer ES", "Lancer SE", "Lancer GT", "Lancer Evolution", "Galant", "Galant ES", "Galant VR-G"],
        "Hyundai": ["Elantra", "Elantra GL", "Elantra GLS", "Elantra Limited", "Elantra Sport", "Sonata", "Sonata GLS", "Sonata Limited", "Sonata Sport", "Sonata Hybrid", "Azera", "Azera GLS", "Azera Limited", "Grandeur", "Grandeur GLS", "Grandeur Limited"],
        "Kia": ["Cerato", "Cerato LX", "Cerato EX", "Cerato SX", "Forte", "Forte LX", "Forte EX", "Forte GT", "K3", "K3 LX", "K3 EX", "K3 GT", "K5", "K5 LX", "K5 EX", "K5 GT", "K5 GT-Line", "Optima", "Optima LX", "Optima EX", "Optima SX", "Optima Hybrid", "Stinger", "Stinger GT", "Stinger GT-Line"],
        "Volkswagen": ["Golf", "Golf Trendline", "Golf Comfortline", "Golf Highline", "Golf GTI", "Golf R", "Jetta", "Jetta Trendline", "Jetta Comfortline", "Jetta Highline", "Jetta GLI", "Passat", "Passat Trendline", "Passat Comfortline", "Passat Highline", "Passat GTE", "Bora", "Bora Trendline", "Bora Comfortline", "Bora Highline", "Sagitar", "Sagitar GLI"],
        "Honda": ["Civic", "Civic LX", "Civic EX", "Civic Touring", "Civic Sport", "Civic Si", "Civic Type R", "Accord", "Accord LX", "Accord EX", "Accord Touring", "Accord Sport", "Accord Hybrid", "Insight", "Insight LX", "Insight EX", "Insight Touring"],
        "Mazda": ["Mazda 3", "Mazda 3 Sport", "Mazda 3 Touring", "Mazda 3 Grand Touring", "Mazda 3 Turbo", "Mazda 6", "Mazda 6 Sport", "Mazda 6 Touring", "Mazda 6 Grand Touring", "Mazda 6 Turbo"],
        "Chery": ["Arrizo 5", "Arrizo 5 GT", "Arrizo 6", "Arrizo 6 GT"]
    },
    
    suv_medium: {
        "Chevrolet": ["Tracker", "Tracker LT", "Tracker Premier", "Onix", "Onix LT", "Onix Premier", "Captiva", "Captiva LT", "Captiva LTZ", "Captiva Sport", "Captiva XL", "Equinox", "Equinox LT", "Equinox Premier", "Blazer", "Blazer RS", "Blazer Premier", "Trax", "Trax LT", "Trax Premier"],
        "Ford": ["EcoSport", "EcoSport SE", "EcoSport Titanium", "Escape", "Escape SE", "Escape Titanium", "Escape Hybrid", "Edge", "Edge SE", "Edge Titanium", "Edge ST", "Bronco Sport", "Bronco Sport Big Bend", "Bronco Sport Badlands"],
        "Toyota": ["RAV4", "RAV4 LE", "RAV4 XLE", "RAV4 Limited", "RAV4 Hybrid", "RAV4 TRD", "C-HR", "C-HR LE", "C-HR XLE", "Fortuner", "Fortuner SRV", "Fortuner SRX"],
        "Nissan": ["Kicks", "Kicks S", "Kicks SV", "Kicks SR", "X-Trail", "X-Trail S", "X-Trail SV", "X-Trail SL", "Rogue", "Rogue S", "Rogue SV", "Rogue SL", "Murano", "Murano S", "Murano SV", "Murano SL", "Murano Platinum", "Juke", "Juke S", "Juke SV", "Juke Nismo"],
        "Mitsubishi": ["ASX", "ASX ES", "ASX SE", "ASX GT", "Outlander", "Outlander ES", "Outlander SE", "Outlander GT", "Outlander PHEV", "Eclipse Cross", "Eclipse Cross ES", "Eclipse Cross SE", "Eclipse Cross GT", "Montero Sport", "Montero Sport GLS", "Montero Sport GT"],
        "Hyundai": ["Venue", "Venue SE", "Venue SEL", "Venue Denim", "Creta", "Creta SE", "Creta SEL", "Creta Limited", "Tucson", "Tucson GLS", "Tucson Limited", "Tucson Sport", "Tucson Hybrid", "Santa Fe", "Santa Fe SE", "Santa Fe SEL", "Santa Fe Limited", "Santa Fe Calligraphy", "Grand Santa Fe", "Grand Santa Fe Limited", "Grand Santa Fe Ultimate", "Kona", "Kona SE", "Kona SEL", "Kona Limited", "Kona N"],
        "Kia": ["Stonic", "Stonic LX", "Stonic EX", "Sonet", "Sonet LX", "Sonet EX", "Sonet SX", "Sportage", "Sportage LX", "Sportage EX", "Sportage SX", "Seltos", "Seltos LX", "Seltos EX", "Seltos SX", "Seltos S", "Sorento", "Sorento LX", "Sorento EX", "Sorento SX"],
        "Jeep": ["Renegade", "Renegade Sport", "Renegade Latitude", "Renegade Limited", "Renegade Trailhawk", "Compass", "Compass Sport", "Compass Latitude", "Compass Limited", "Compass Trailhawk", "Cherokee", "Cherokee Latitude", "Cherokee Limited", "Cherokee Trailhawk", "Cherokee Overland"],
        "Volkswagen": ["T-Cross", "T-Cross Trendline", "T-Cross Comfortline", "T-Cross Highline", "T-Roc", "T-Roc Trendline", "T-Roc Comfortline", "T-Roc R-Line", "T-Roc R", "Tiguan", "Tiguan Trendline", "Tiguan Comfortline", "Tiguan Highline", "Tiguan R-Line", "Tiguan Allspace", "Taos", "Taos Trendline", "Taos Comfortline", "Taos Highline", "Tharu", "Tharu Trendline", "Tharu Comfortline", "Tharu Highline"],
        "Honda": ["HR-V", "HR-V LX", "HR-V EX", "HR-V Touring", "HR-V Sport", "WR-V", "WR-V DX", "WR-V EX", "WR-V Touring", "CR-V", "CR-V LX", "CR-V EX", "CR-V Touring", "CR-V Hybrid", "BR-V", "BR-V S", "BR-V E", "BR-V V", "BR-V Prestige"],
        "Mazda": ["CX-3", "CX-3 Sport", "CX-3 Touring", "CX-3 Grand Touring", "CX-30", "CX-30 Sport", "CX-30 Touring", "CX-30 Premium", "CX-30 Turbo", "CX-5", "CX-5 Sport", "CX-5 Touring", "CX-5 Grand Touring", "CX-5 Signature", "CX-5 Turbo", "CX-7", "CX-7 Sport", "CX-7 Touring", "CX-7 Grand Touring"],
        "Great Wall": ["Haval H6", "Haval H6 Sport", "Haval H6 GT", "Haval H6 HEV", "Haval H6 PHEV", "Haval Jolion", "Haval Jolion HEV", "Haval Dargo"],
        "JAC": ["S2", "S2 Luxury", "S3", "S3 Luxury", "S3 Elite", "S4", "S4 Luxury", "S7", "S7 Luxury", "JS3", "JS4", "JS6"],
        "Maxus": ["RX5", "RX5 GLX", "RX5 Luxe", "RX8", "RX8 GLX", "RX8 Luxe"],
        "Changan": ["CS35", "CS35 Plus", "CS55", "CS55 Plus", "CS75", "CS75 Plus", "CS95", "UNI-T", "UNI-K", "UNI-V"],
        "Foton": ["Sauvana", "Sauvana 4x2", "Sauvana 4x4"],
        "Chery": ["Tiggo 2", "Tiggo 2 Pro", "Tiggo 3", "Tiggo 3 Sport", "Tiggo 4", "Tiggo 4 Pro", "Tiggo 7", "Tiggo 7 Pro", "Tiggo 7 Pro Max", "Tiggo 8", "Tiggo 8 Pro", "Tiggo 8 Pro Max", "Tiggo 8 Pro e+", "Tiggo 5x", "Tiggo 5x Pro"],
        "Jetour": ["X70", "X70 Plus", "X70 Coupe", "X70S", "X70S Pro", "X90", "X90 Plus", "X95", "T2", "T2 Traveler", "Dashing"],
        "Haval": ["H2", "H2S", "H6", "H6 GT", "H6 HEV", "H6 PHEV", "H9", "H9 Luxe", "Jolion", "Jolion HEV", "Dargo", "Dargo X"],
        "BAIC": ["BJ40", "BJ40 Plus", "BJ40 Ring Tower", "BJ80", "X35", "X55", "X75"]
    },
    
    suv_large_pickup: {
        "Chevrolet": ["Tahoe", "Tahoe LT", "Tahoe Premier", "Tahoe Z71", "Suburban", "Suburban LT", "Suburban Premier", "Suburban Z71", "Traverse", "Traverse LT", "Traverse Premier", "Colorado", "Colorado LT", "Colorado Z71", "Colorado High Country", "Silverado", "Silverado 1500", "Silverado 2500HD", "Silverado 3500HD", "LUV D-Max", "D-Max", "D-Max LTZ", "D-Max High Country", "S-10", "S-10 LS", "S-10 LTZ", "Trailblazer", "Trailblazer LT", "Trailblazer RS"],
        "Ford": ["Explorer", "Explorer XLT", "Explorer Limited", "Explorer ST", "Explorer Platinum", "Expedition", "Expedition XLT", "Expedition Limited", "Expedition Platinum", "Bronco", "Bronco Big Bend", "Bronco Black Diamond", "Bronco Badlands", "Bronco Raptor", "Ranger", "Ranger XL", "Ranger XLT", "Ranger Lariat", "Ranger Wildtrak", "Ranger Raptor", "F-150", "F-150 XL", "F-150 XLT", "F-150 Lariat", "F-150 King Ranch", "F-150 Platinum", "F-150 Raptor", "Maverick", "Maverick XL", "Maverick XLT", "Maverick Lariat", "Super Duty", "F-250", "F-250 XL", "F-250 XLT", "F-250 Lariat", "F-350", "F-350 XL", "F-350 XLT", "F-350 Lariat"],
        "Toyota": ["Highlander", "Highlander LE", "Highlander XLE", "Highlander Limited", "Highlander Hybrid", "4Runner", "4Runner SR5", "4Runner TRD Pro", "4Runner Limited", "4Runner TRD Off-Road", "Sequoia", "Sequoia SR5", "Sequoia Limited", "Sequoia Platinum", "Sequoia TRD Pro", "Hilux", "Hilux SR", "Hilux SRV", "Hilux SRX", "Hilux Revo", "Hilux GR Sport", "Tacoma", "Tacoma SR", "Tacoma SR5", "Tacoma TRD Sport", "Tacoma TRD Off-Road", "Tacoma TRD Pro", "Tundra", "Tundra SR", "Tundra SR5", "Tundra Limited", "Tundra Platinum", "Tundra TRD Pro", "Land Cruiser", "Land Cruiser 200", "Land Cruiser 250", "Land Cruiser 300", "Prado", "Land Cruiser Prado", "Prado TX", "Prado TZ", "Prado VX"],
        "Nissan": ["Pathfinder", "Pathfinder S", "Pathfinder SV", "Pathfinder SL", "Pathfinder Platinum", "Armada", "Armada SV", "Armada SL", "Armada Platinum", "Patrol", "Patrol LE", "Patrol SE", "Patrol Platinum", "Frontier", "Frontier XE", "Frontier SE", "Frontier LE", "Frontier PRO-4X", "Frontier Desert Runner", "NP300", "NP300 XE", "NP300 SE", "NP300 LE", "Navara", "Navara XE", "Navara SE", "Navara LE", "Navara PRO-4X", "Titan", "Titan S", "Titan SV", "Titan PRO-4X", "Titan Platinum Reserve"],
        "Mitsubishi": ["Montero", "Montero GLS", "Montero Limited", "Pajero", "Pajero GLS", "Pajero Evolution", "L200", "L200 GL", "L200 GLS", "L200 HPE", "Triton", "Triton GL", "Triton GLS", "Triton HPE", "Triton Athlete", "Triton Ralliart"],
        "Hyundai": ["Palisade", "Palisade SE", "Palisade SEL", "Palisade Limited", "Palisade Calligraphy", "Santa Cruz", "Santa Cruz SE", "Santa Cruz SEL", "Santa Cruz Limited"],
        "Kia": ["Telluride", "Telluride LX", "Telluride EX", "Telluride SX", "Mohave", "Mohave GLS", "Mohave Limited", "Tasman", "Tasman DLX", "Tasman LX", "Tasman SX"],
        "Jeep": ["Grand Cherokee", "Grand Cherokee Laredo", "Grand Cherokee Limited", "Grand Cherokee Overland", "Grand Cherokee Summit", "Grand Cherokee Trackhawk", "Wagoneer", "Wagoneer Series I", "Wagoneer Series II", "Wagoneer Series III", "Grand Wagoneer", "Grand Wagoneer Series I", "Grand Wagoneer Series II", "Grand Wagoneer Series III", "Wrangler", "Wrangler Sport", "Wrangler Sahara", "Wrangler Rubicon", "Wrangler Rubicon 392", "Gladiator", "Gladiator Sport", "Gladiator Overland", "Gladiator Rubicon", "Gladiator Mojave", "Commander", "Commander Limited", "Commander Overland", "Liberty", "Liberty Sport", "Liberty Limited", "Patriot", "Patriot Sport", "Patriot Limited"],
        "Volkswagen": ["Teramont", "Teramont Trendline", "Teramont Comfortline", "Teramont Highline", "Atlas", "Atlas SE", "Atlas SEL", "Atlas R-Line", "Touareg", "Touareg V6", "Touareg V8", "Touareg R-Line", "Amarok", "Amarok Trendline", "Amarok Highline", "Amarok V6", "Amarok Aventura"],
        "Honda": ["Pilot", "Pilot LX", "Pilot EX", "Pilot Touring", "Pilot Elite", "Pilot TrailSport", "Passport", "Passport LX", "Passport EX-L", "Passport TrailSport", "Ridgeline", "Ridgeline RTX", "Ridgeline Sport", "Ridgeline RTL", "Ridgeline TrailSport"],
        "Mazda": ["CX-9", "CX-9 Sport", "CX-9 Touring", "CX-9 Grand Touring", "CX-9 Signature", "CX-9 Turbo", "BT-50", "BT-50 GL", "BT-50 GLS", "BT-50 HPE"],
        "Great Wall": ["Wingle", "Wingle 3", "Wingle 5", "Wingle 6", "Wingle 7", "Poer", "Poer King Kong", "Poer P-Series", "Poer Cannon"],
        "JAC": ["T6", "T6 GL", "T6 GLS", "T8", "T8 Pro", "T8 GL", "T8 GLS", "T9", "T9 Hunter", "T9 Pro", "Hunter", "Hunter GL", "Hunter GLS"],
        "Maxus": ["T60", "T60 GLX", "T60 Luxe", "T60 Pioneer", "T70", "T70 GLX", "T70 Luxe", "T70 Pioneer", "T70 Adventure", "T90", "T90 GLX", "T90 Luxe", "T90 Pioneer", "D90", "D90 GLX", "D90 Luxe"],
        "Changan": ["Hunter", "Hunter GL", "Hunter GLS"],
        "Foton": ["Tunland", "Tunland E", "Tuneland S", "Tunland G7"]
    }
};


// ============================================================
// 4. TABLA DE PRECIOS (EN USD)
// ============================================================
const priceTable = {
    "AUTO PEQUEÑO": {
        "URBANO": 25,
        "ESTANDAR": 35,
        "PREMIUM": 90,
        "RECTIFICACION": 25,
        "MANO_OBRA": 10
    },
    "SEDAN MEDIANO": {
        "URBANO": 35,
        "ESTANDAR": 55,
        "PREMIUM": 105,
        "RECTIFICACION": 35,
        "MANO_OBRA": 15
    },
    "SUV / CAMIONETA MEDIANA": {
        "URBANO": 45,
        "ESTANDAR": 65,
        "PREMIUM": 115,
        "RECTIFICACION": 45,
        "MANO_OBRA": 20
    },
    "SUV GRANDE / PICKUP": {
        "URBANO": 50,
        "ESTANDAR": 75,
        "PREMIUM": 130,
        "RECTIFICACION": 50,
        "MANO_OBRA": 30
    },
    "PREMIUM": {
        "URBANO": null,
        "ESTANDAR": 125,
        "PREMIUM": 165,
        "RECTIFICACION": 60,
        "MANO_OBRA": 40
    }
};

// Descuento por paquete "Renovación Express"
const PAQUETE_DESCUENTO = 10;


// ============================================================
// 5. FUNCIONES PRINCIPALES
// ============================================================

/**
 * Busca una marca en vehicleData de forma case-insensitive
 * @param {string} marca - Marca a buscar
 * @returns {string|null} Marca encontrada con formato original o null
 */
function findMarca(marca) {
    const marcaUpper = marca.toUpperCase().trim();
    for (let key in vehicleData) {
        if (key.toUpperCase() === marcaUpper) {
            return key;
        }
    }
    return null;
}

/**
 * Busca un modelo en un array de modelos de forma case-insensitive
 * @param {Array} modelos - Array de modelos
 * @param {string} modeloBuscado - Modelo a buscar
 * @returns {boolean}
 */
function findModelo(modelos, modeloBuscado) {
    const modeloUpper = modeloBuscado.toUpperCase().trim();
    return modelos.some(m => m.toUpperCase() === modeloUpper);
}

/**
 * Determina la categoría de precio según marca y modelo del vehículo
 * @param {string} marca - Marca del vehículo (ej: "Toyota", "BMW")
 * @param {string} modelo - Modelo del vehículo (ej: "Corolla", "X5")
 * @returns {Object} Objeto con la categoría y detalles
 */
function getVehicleCategory(marca, modelo) {
    const marcaEncontrada = findMarca(marca);
    
    if (!marcaEncontrada) {
        return {
            categoria: "DESCONOCIDO",
            marca: marca,
            modelo: modelo,
            mensaje: `La marca "${marca}" no está registrada en el sistema`,
            requiereCotizacion: true
        };
    }
    
    // Verificar si es marca PREMIUM
    const esPremium = PREMIUM_BRANDS.some(brand => brand.toUpperCase() === marcaEncontrada.toUpperCase());
    
    if (esPremium) {
        return {
            categoria: "PREMIUM",
            marca: marcaEncontrada,
            modelo: modelo,
            mensaje: "Vehículo premium - Tarifa PREMIUM aplica automáticamente",
            requiereCotizacion: false
        };
    }
    
    // Verificar si el modelo existe en la marca
    const modelosMarca = vehicleData[marcaEncontrada];
    if (!findModelo(modelosMarca, modelo)) {
        return {
            categoria: "DESCONOCIDO",
            marca: marcaEncontrada,
            modelo: modelo,
            mensaje: `El modelo "${modelo}" no está registrado para la marca "${marcaEncontrada}"`,
            requiereCotizacion: true
        };
    }
    
    // Buscar en qué categoría de tamaño está el modelo
    const categoriasNombres = {
        "small": "AUTO PEQUEÑO",
        "sedan": "SEDAN MEDIANO",
        "suv_medium": "SUV / CAMIONETA MEDIANA",
        "suv_large_pickup": "SUV GRANDE / PICKUP"
    };
    
    for (let categoria in vehicleSizeCategories) {
        const marcasEnCategoria = vehicleSizeCategories[categoria];
        if (marcasEnCategoria[marcaEncontrada]) {
            const modelosEnCategoria = marcasEnCategoria[marcaEncontrada];
            if (findModelo(modelosEnCategoria, modelo)) {
                return {
                    categoria: categoriasNombres[categoria],
                    marca: marcaEncontrada,
                    modelo: modelo,
                    mensaje: `Vehículo clasificado como ${categoriasNombres[categoria]}`,
                    requiereCotizacion: false
                };
            }
        }
    }
    
    return {
        categoria: "SIN_CLASIFICAR",
        marca: marcaEncontrada,
        modelo: modelo,
        mensaje: `El modelo "${modelo}" existe pero no está clasificado por tamaño`,
        requiereCotizacion: true
    };
}

/**
 * Obtiene el precio según la categoría del vehículo y el servicio
 * @param {string} categoria - Categoría del vehículo
 * @param {string} servicio - Tipo de servicio (URBANO, ESTANDAR, PREMIUM, RECTIFICACION, MANO_OBRA)
 * @returns {number|null} Precio del servicio o null si no existe
 */
function getPrice(categoria, servicio) {
    if (!priceTable[categoria]) return null;
    return priceTable[categoria][servicio] || null;
}

/**
 * Genera una cotización completa para un vehículo y servicio específico
 * @param {string} marca - Marca del vehículo
 * @param {string} modelo - Modelo del vehículo
 * @param {string} nivelCalidad - Nivel de calidad (URBANO, ESTANDAR, PREMIUM)
 * @param {boolean} incluyeRectificacion - Si incluye rectificación de discos
 * @param {boolean} clienteTraeRepuesto - Si el cliente trae sus propias pastillas
 * @returns {Object} Cotización detallada
 */
function generateQuote(marca, modelo, nivelCalidad = "ESTANDAR", incluyeRectificacion = false, clienteTraeRepuesto = false) {
    const vehicleInfo = getVehicleCategory(marca, modelo);
    
    if (vehicleInfo.requiereCotizacion) {
        return {
            exito: false,
            vehiculo: `${marca} ${modelo}`,
            mensaje: vehicleInfo.mensaje,
            accionRequerida: "Cotización manual requerida - Contactar a David",
            total: 0
        };
    }
    
    const categoria = vehicleInfo.categoria;
    
    // Validar nivel de calidad para vehículos premium
    if (categoria === "PREMIUM" && nivelCalidad === "URBANO") {
        return {
            exito: false,
            vehiculo: `${marca} ${modelo}`,
            categoria: categoria,
            mensaje: "No se recomienda nivel URBANO para vehículos premium. Use ESTANDAR o PREMIUM.",
            accionRequerida: "Seleccionar nivel de calidad adecuado",
            total: 0
        };
    }
    
    let cotizacion = {
        exito: true,
        vehiculo: `${vehicleInfo.marca} ${vehicleInfo.modelo}`,
        categoria: categoria,
        servicios: [],
        total: 0
    };
    
    // Calcular precio de pastillas
    if (clienteTraeRepuesto) {
        const precioManoObra = getPrice(categoria, "MANO_OBRA");
        cotizacion.servicios.push({
            concepto: "Solo mano de obra (cliente trae repuesto)",
            precio: precioManoObra,
            nota: "Garantía solo aplica a mano de obra, no al repuesto"
        });
    } else {
        const precioPastillas = getPrice(categoria, nivelCalidad);
        cotizacion.servicios.push({
            concepto: `Pastillas nivel ${nivelCalidad} (repuesto + mano de obra + garantía)`,
            precio: precioPastillas
        });
    }
    
    // Calcular precio de rectificación si aplica
    if (incluyeRectificacion) {
        const precioRectificacion = getPrice(categoria, "RECTIFICACION");
        cotizacion.servicios.push({
            concepto: "Rectificación de discos (par delantero)",
            precio: precioRectificacion
        });
    }
    
    // Calcular subtotal
    let subtotal = cotizacion.servicios.reduce((sum, item) => sum + (item.precio || 0), 0);
    
    // Aplicar descuento por paquete si cliente trae repuesto + rectificación
    if (clienteTraeRepuesto && incluyeRectificacion) {
        cotizacion.servicios.push({
            concepto: "Descuento paquete 'Renovación Express'",
            precio: -PAQUETE_DESCUENTO
        });
        subtotal = subtotal - PAQUETE_DESCUENTO;
    }
    
    cotizacion.total = subtotal;
    return cotizacion;
}

/**
 * Lista todas las marcas registradas en el sistema
 * @returns {Array} Array de nombres de marcas
 */
function getAllMarcas() {
    return Object.keys(vehicleData);
}

/**
 * Lista todos los modelos de una marca específica
 * @param {string} marca - Marca a consultar
 * @returns {Array|null} Array de modelos o null si no existe
 */
function getModelosByMarca(marca) {
    const marcaEncontrada = findMarca(marca);
    if (!marcaEncontrada) return null;
    return vehicleData[marcaEncontrada];
}

/**
 * Verifica si una marca es premium
 * @param {string} marca - Marca a verificar
 * @returns {boolean}
 */
function isPremiumBrand(marca) {
    const marcaEncontrada = findMarca(marca);
    if (!marcaEncontrada) return false;
    return PREMIUM_BRANDS.some(brand => brand.toUpperCase() === marcaEncontrada.toUpperCase());
}


// ============================================================
// 6. EXPORTAR PARA USO EN OTROS ARCHIVOS (HTML)
// ============================================================
// Si se usa como módulo:
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        vehicleData,
        PREMIUM_BRANDS,
        vehicleSizeCategories,
        priceTable,
        getVehicleCategory,
        getPrice,
        generateQuote,
        getAllMarcas,
        getModelosByMarca,
        isPremiumBrand,
        findMarca,
        findModelo
    };
}