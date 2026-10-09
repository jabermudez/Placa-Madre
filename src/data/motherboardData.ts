/**
 * Base de datos técnica y exhaustiva sobre la arquitectura, anatomía,
 * evolución y modelos históricos de placas base (motherboards).
 */

export interface ComponentAnatomy {
  id: number;
  name: string;
  category: 'procesamiento' | 'expansion' | 'conectividad' | 'control';
  tag: string;
  shortDesc: string;
  detailedDesc: string;
  electricalSpecs: string;
  historicalEvolution: string;
  pinoutOrBus: string;
  commonIssues: string;
  coordinates: { x: number; y: number }; // Percentage coords on schematic
}

export interface EraGeneration {
  id: string;
  period: string;
  name: string;
  subtitle: string;
  description: string;
  keyInnovations: string[];
  busStandards: string;
  memoryTech: string;
  storageTech: string;
  formFactors: string;
  powerStandards: string;
  representativeModel: string;
  chipsetArchitecture: string;
}

export interface MotherboardModel {
  id: string;
  name: string;
  year: number;
  era: string;
  manufacturer: string;
  socket: string;
  chipset: string;
  memorySupport: string;
  expansionSlots: string;
  storageInterfaces: string;
  formFactor: string;
  significance: string;
  historicalContext: string;
  highlights: string[];
  specs: {
    fsbOrInterconnect: string;
    maxRam: string;
    vrmPhases: string;
    powerConnector: string;
  };
}

export interface BenchmarkDataPoint {
  generation: string;
  year: number;
  bandwidthMBs: number;
  relativeGain: string;
  notes: string;
}

export interface FormFactorSpec {
  name: string;
  dimensionsMm: string;
  dimensionsInches: string;
  expansionSlotsMax: number;
  ramSlotsTypical: string;
  targetMarket: string;
  description: string;
}

// 19 componentes mapeados exactamente a las guías visuales proporcionadas por el usuario
export const MOTHERBOARD_COMPONENTS: ComponentAnatomy[] = [
  {
    id: 1,
    name: 'Puertos USB (Universal Serial Bus)',
    category: 'conectividad',
    tag: 'E/S Periférica',
    shortDesc: 'Interfaz serie universal para periféricos externos como teclados, ratones, memorias y periféricos de alta velocidad.',
    detailedDesc: 'El bus serie universal revolucionó las placas base al reemplazar los puertos serie RS-232 y paralelos IEEE 1284. Hoy conviven múltiples generaciones en el panel trasero: USB 2.0 (480 Mbps, líneas D+/D-), USB 3.2 Gen 1 (5 Gbps con pares diferenciales SuperSpeed), USB 3.2 Gen 2 (10 Gbps) y USB4 / Thunderbolt 4 (hasta 40 Gbps sobre conectores Tipo-C con multiplexación PCIe y DisplayPort).',
    electricalSpecs: '5V nominal. USB 2.0 suministra hasta 500 mA (2.5W); USB 3.0 hasta 900 mA (4.5W); USB-PD sobre Tipo-C puede negociar 9V, 15V y 20V hasta 100W/240W mediante chips controladores CC/E-Marker.',
    historicalEvolution: 'Introducido en 1996 (USB 1.0 a 1.5 Mbps). El chipset Intel 430TX fue de los primeros en integrar controladores USB nativos. Ha pasado de 1.5 Mbps a 80 Gbps en USB4 2.0.',
    pinoutOrBus: 'USB Type-A: 4 pines (VBUS, D-, D+, GND) en USB 2.0; 9 pines en USB 3.0. Controlado por PCH o controladores ASMedia/Realtek dedicados.',
    commonIssues: 'Fusibles rearmables (polyfuses) saltados por cortocircuitos en periféricos externos; ruido de señal de 2.4 GHz interfiriendo con receptores inalámbricos.',
    coordinates: { x: 12, y: 38 }
  },
  {
    id: 2,
    name: 'Puerto VGA (Video Graphics Array / D-Sub 15)',
    category: 'conectividad',
    tag: 'Salida de Video Analógica',
    shortDesc: 'Conector analógico de 15 pines para monitores CRT y pantallas LCD tempranas.',
    detailedDesc: 'Diseñado por IBM en 1987, transmite señales analógicas de componentes RGB (rojo, verde, azul) junto con sincronización horizontal y vertical. En placas modernas ha sido completamente descontinuado o sustituido por HDMI/DisplayPort, ya que las CPUs modernas y GPUs carecen de convertidores digital-analógico (RAMDAC) integrados.',
    electricalSpecs: 'Señal de video de 0.7 V pico a pico sobre impedancia característica de 75 Ω. DDC (Display Data Channel) alimentado a 5V para identificación EDID.',
    historicalEvolution: 'Estándar dominante entre 1990 y 2010. Retirado oficialmente por Intel y AMD en 2015 en favor de interfaces puramente digitales libres de conversión analógica.',
    pinoutOrBus: '15 pines en 3 filas: R, G, B, retornos de tierra, H-Sync, V-Sync, líneas I2C (SDA/SCL) para lectura EDID del monitor.',
    commonIssues: 'Pérdida de nitidez (ghosting) por cables no apantallados; deformación o ruptura física de los pines delgados al conectar con fuerza excesiva.',
    coordinates: { x: 12, y: 28 }
  },
  {
    id: 3,
    name: 'Puerto HDMI (High-Definition Multimedia Interface)',
    category: 'conectividad',
    tag: 'Video y Audio Digital',
    shortDesc: 'Interfaz digital no comprimida para audio y video de alta definición a televisores y monitores modernos.',
    detailedDesc: 'Transmite datos mediante señalización diferencial minimizada para la transición (TMDS) o señalización de velocidad fija (FRL en HDMI 2.1). Conecta directamente con la GPU integrada (iGPU) del procesador a través de las pistas de video digital del zócalo, soportando resoluciones de hasta 8K@60Hz o 4K@120Hz con protección HDCP y retorno de audio.',
    electricalSpecs: 'Niveles lógicos CML de 3.3V en las líneas TMDS/FRL con resistencias pull-up de 50 Ω. Pin 18 provee 5V (mínimo 55 mA) para alimentar la memoria EEPROM del receptor.',
    historicalEvolution: 'HDMI 1.0 apareció en 2002 (4.95 Gbps). Adoptado masivamente en placas madre alrededor de 2006-2008 con la llegada de placas MicroATX para centros multimedia (HTPC). HDMI 2.1 alcanza 48 Gbps.',
    pinoutOrBus: '19 pines: 4 pares diferenciales TMDS/FRL, líneas DDC (I2C), CEC (Control Electrónico de Consumo), detección Hot-Plug y alimentación de 5V.',
    commonIssues: 'Daño por descarga electrostática (ESD) al enchufar pantallas encendidas sin diodos TVS de protección adecuados en la placa.',
    coordinates: { x: 12, y: 48 }
  },
  {
    id: 4,
    name: 'Puerto LAN / Ethernet (RJ-45)',
    category: 'conectividad',
    tag: 'Red Cableada de Datos',
    shortDesc: 'Conector modular 8P8C para conexión a redes de área local e Internet mediante cable de par trenzado.',
    detailedDesc: 'Integra un conector magnético (MagJack) con transformadores de aislamiento que protegen el controlador PHY contra bucles de tierra y sobretensiones. Las placas modernas integran controladores Gigabit (1 GbE), 2.5 GbE (como Intel I225-V o Realtek RTL8125) e incluso 10 GbE en placas de gama entusiasta (Aquantia AQC113).',
    electricalSpecs: 'Aislamiento galvánico de hasta 1500 Vrms. Modulación PAM-5 (1 Gbps) o PAM-16 (10 Gbps) sobre cables Cat5e, Cat6 o Cat6A.',
    historicalEvolution: 'Antiguamente requería tarjetas dedicadas ISA/PCI (ej. 3Com EtherLink). Integrado de serie a partir de 2001-2003 con chipsets como Intel 845G y Nvidia nForce.',
    pinoutOrBus: '8 pines agrupados en 4 pares diferenciales trenzados (MDI0±, MDI1±, MDI2±, MDI3±) conectados al chip PHY mediante interfaz PCIe o PCIe multiplexada.',
    commonIssues: 'Rotura de la pestaña de retención plástica; fallas de autonegociación a 2.5 GbE en revisiones iniciales de silicio (ej. Intel I225-V rev B1/B2).',
    coordinates: { x: 12, y: 58 }
  },
  {
    id: 5,
    name: 'Puertos de Audio Jack 3.5mm y S/PDIF',
    category: 'conectividad',
    tag: 'Subsistema de Sonido',
    shortDesc: 'Conectores analógicos estéreo de 3.5 mm codificados por colores y salida digital óptica TOSLINK.',
    detailedDesc: 'Gestionados por un códec de alta definición (como Realtek ALC897, ALC1220 o ALC4080 con DAC ESS Sabre). Las placas de calidad incorporan pistas de audio físicamente aisladas del resto del PCB mediante una línea de separación sin cobre (aislamiento EMI) para impedir que el ruido de alta frecuencia del VRM y la RAM se filtre al sonido.',
    electricalSpecs: 'Nivel de línea estándar de ~1V a 2V RMS. Impedancia de salida <10 Ω para auriculares. Condensadores electrolíticos de audio dedicados (Nichicon Fine Gold / WIMA).',
    historicalEvolution: 'Pasó del estándar primitivo AC\'97 (máx. 48 kHz / 20 bits) al estándar Intel High Definition Audio (HDA) en 2004 (hasta 192 kHz / 32 bits multicanal 7.1).',
    pinoutOrBus: 'Código de colores estándar: Verde (Salida frontal), Azul (Entrada de línea), Rosa (Micrófono), Naranja (Subwoofer/Centro), Negro (Traseros), Gris (Laterales).',
    commonIssues: 'Zumbido o silbido audible (ground loop coil whine) cuando no existe aislamiento de tierra o cuando se usan los cabezales del frontal de chasis no blindados.',
    coordinates: { x: 12, y: 68 }
  },
  {
    id: 6,
    name: 'Panel Trasero de Entrada/Salida (Rear I/O Shield)',
    category: 'conectividad',
    tag: 'Consola de Puertos Externa',
    shortDesc: 'Área consolidada donde convergen todos los puertos externos de la computadora para comunicación con el mundo exterior.',
    detailedDesc: 'El escudo de E/S cumple dos misiones críticas: proporcionar acceso ordenado a puertos y actuar como jaula de Faraday que reduce las emisiones de interferencia electromagnética (EMI) y asegura conexión a tierra con el chasis. En placas modernas el escudo viene preinstalado de fábrica integrado al disipador de VRM para mayor rigidez y estética.',
    electricalSpecs: 'Punto de conexión a tierra del chasis (Chassis Ground). Incluye contactos metálicos elásticos o empaquetaduras de grafito/espuma conductora.',
    historicalEvolution: 'Estandarizado en la especificación Intel ATX de 1995 con unas dimensiones fijas de 158.75 × 44.45 mm (6.25 × 1.75 pulgadas), eliminando los cables desordenados del estándar Baby AT.',
    pinoutOrBus: 'Aloja puertos serie, USB, Ethernet, HDMI/DP, Audio, antenas Wi-Fi RP-SMA, botón Clear CMOS y botón BIOS Flashback.',
    commonIssues: 'Pestañas metálicas mal alineadas que se introducían dentro de los conectores RJ-45 o USB en escudos de chapa suelta antiguos.',
    coordinates: { x: 10, y: 50 }
  },
  {
    id: 7,
    name: 'Conector de Alimentación EPS 12V (4/8 Pines CPU)',
    category: 'procesamiento',
    tag: 'Alimentación Primaria CPU',
    shortDesc: 'Conector dedicado de 12V que suministra corriente eléctrica exclusivamente al módulo regulador de voltaje (VRM) del procesador.',
    detailedDesc: 'A medida que los microprocesadores aumentaron su consumo de más de 100W a más de 300W en cargas extremas, el cable ATX principal resultó insuficiente. El conector EPS 12V suministra rieles de +12V mediante cables de calibre 18 AWG o 16 AWG directamente a los MOSFETs de potencia del VRM, minimizando caídas de tensión por resistencia óhmica.',
    electricalSpecs: 'Conector de 4 pines soporta ~144W continuos; conector de 8 pines soporta ~288W continuos a 12V (hasta 384W con pines sólidos de aleación de cobre). Muchas placas gama alta montan 8+8 pines o 8+4 pines.',
    historicalEvolution: 'Introducido por Intel con la especificación ATX12V 1.0 para el Pentium 4 en el año 2000 (el famoso conector "P4" cuadrado de 4 pines). Evolucionó al estándar EPS12V de 8 pines.',
    pinoutOrBus: '4 u 8 pines divididos en filas: pines inferiores GND (tierra, cables negros), pines superiores +12V DC (cables amarillos). Con llave mecánica de polarización.',
    commonIssues: 'Sobrecalentamiento y fundición del plástico del conector si se hace overclocking extremo en procesadores de más de 250W con cables de mala calidad o un solo conector de 4 pines.',
    coordinates: { x: 26, y: 15 }
  },
  {
    id: 8,
    name: 'Zócalo del CPU (CPU Socket)',
    category: 'procesamiento',
    tag: 'Receptáculo Central del Procesador',
    shortDesc: 'Zócalo electromecánico de alta precisión que conecta físicamente los cientos o miles de contactos del procesador con las pistas del PCB.',
    detailedDesc: 'Es el núcleo de la placa base. Existen tres familias principales: PGA (Pin Grid Array, donde los pines están en la CPU y los agujeros en la placa, como en AMD AM4); LGA (Land Grid Array, donde los pines flexibles están en el zócalo de la placa y la CPU tiene contactos planos dorados, como Intel LGA 1700/1851 y AMD AM5); y BGA (Ball Grid Array, soldado con microesferas de estaño, común en portátiles).',
    electricalSpecs: 'Soporta corrientes de hasta 200-300A a tensiones dinámicas de 0.8V a 1.45V. Cada pin individual transporta entre 0.5A y 1.5A.',
    historicalEvolution: 'Desde el zócalo DIP de 40 pines del Intel 8088 (1981), pasando por Socket 7 (321 pines), Socket A (462 pines), hasta Socket AM5 (1718 contactos) e Intel LGA 1851 (1851 contactos).',
    pinoutOrBus: 'Miles de contactos divididos en: líneas de alimentación VCC/VDD, planos de tierra VSS, bus de memoria DDR, líneas PCIe Gen 4/5, enlaces DMI/UMI y señales de control.',
    commonIssues: 'Doblado irreversible de los pines LGA microscópicos por caídas accidentales de la CPU o exceso de presión de torsión del disipador.',
    coordinates: { x: 38, y: 28 }
  },
  {
    id: 9,
    name: 'Ranuras de Memoria RAM (DRAM Slots / DIMM)',
    category: 'procesamiento',
    tag: 'Memoria de Acceso Aleatorio',
    shortDesc: 'Ranuras modulares DIMM diseñadas para la instalación de módulos de memoria DDR en configuración de doble o cuádruple canal.',
    detailedDesc: 'Permiten la comunicación bidireccional a velocidades ultra-altas entre el controlador integrado de memoria (IMC) del CPU y los circuitos integrados DRAM. Las placas modernas emplean topología de ruteo "Daisy Chain" (óptima para 2 módulos de alta frecuencia) o "T-Topology" (balanceada para 4 módulos). Con DDR5, la placa transfiere la regulación de voltaje (PMIC) al propio módulo de memoria.',
    electricalSpecs: 'Tensiones decrecientes: DDR1 a 2.5V, DDR2 a 1.8V, DDR3 a 1.5V, DDR4 a 1.2V y DDR5 a 1.1V base (VDD/VDDQ). Canales de 64 bits en DDR4 vs. dos subcanales de 32 bits por módulo en DDR5.',
    historicalEvolution: 'De chips DIP soldados a ranuras SIMM de 30 y 72 pines, luego DIMM SDRAM de 168 pines, DDR1 (184 pines), DDR2 (240 pines), DDR3 (240 pines), DDR4 (288 pines) y DDR5 (288 pines con muesca reubicada).',
    pinoutOrBus: 'Buses paralelos de alta frecuencia con longitud de pistas estrictamente emparejada (trace length matching) y curvas en serpentina para evitar desfase temporal.',
    commonIssues: 'Incompatibilidad de perfiles XMP/EXPO, suciedad en los contactos dorados, o pines de retención forzados sin alinear la muesca polarizadora.',
    coordinates: { x: 62, y: 22 }
  },
  {
    id: 10,
    name: 'Conector de Alimentación ATX de 24 Pines',
    category: 'control',
    tag: 'Alimentación Principal de la Placa',
    shortDesc: 'Conector primario que provee energía a la lógica de la placa base, ranuras PCIe, memoria RAM y controladores auxiliares.',
    detailedDesc: 'Es el enlace primordial entre la fuente de poder (PSU) y la placa. Provee múltiples líneas de tensión: +12V (para motores de discos, convertidores auxiliares y parte del PCIe), +5V (para lógica heredada, chips y USB), +3.3V (para circuitos lógicos modernos y módulos M.2), +5VSB (energía de espera en modo suspendido) y la señal fundamental PS_ON y PWR_OK (Power Good).',
    electricalSpecs: 'Capacidad de corriente de aproximadamente 20A en rieles combinados. Especificación ATX12V 2.x sustituyó al conector original de 20 pines al añadir 4 pines extras para soportar los 75W del bus PCIe.',
    historicalEvolution: 'ATX 1.0 (1995) introdujo el conector de 20 pines. Con la llegada de PCI Express en 2003-2004, se añadieron 4 pines adicionales convirtiéndose en el estándar de 24 pines (20+4). Las nuevas especificaciones ATX12VO buscan reemplazarlo con un conector de 10 pines puro de 12V.',
    pinoutOrBus: '24 pines Molex Mini-Fit Jr. con voltajes de +3.3V, +5V, +12V, -12V, GND, señal de encendido PS_ON (verde) y PWR_OK (gris).',
    commonIssues: 'Mal contacto o holgura mecánica que provoca caídas de tensión intermitentes y reinicios inexplicables bajo carga.',
    coordinates: { x: 74, y: 32 }
  },
  {
    id: 11,
    name: 'Chipset (PCH / Concentrador de Controladores)',
    category: 'control',
    tag: 'Centro de Comunicaciones Secundario',
    shortDesc: 'Conjunto de circuitos integrados que administra y multiplexa el tráfico entre periféricos lentos, almacenamiento y el procesador.',
    detailedDesc: 'Históricamente compuesto por dos chips: el Puente Norte (Northbridge), que manejaba memoria y gráficos AGP a alta velocidad, y el Puente Sur (Southbridge), que gestionaba buses lentos como PCI, IDE, USB y BIOS. En la actualidad, el Puente Norte está dentro de la CPU y el Chipset es un único concentrador llamado PCH (Platform Controller Hub) o PROM21 (AMD AM5), enlazado al CPU por un bus serie de alta velocidad (DMI o PCIe Uplink).',
    electricalSpecs: 'TDP típico de 6W a 15W. Requiere disipador de aluminio pasivo (o ventilador activo en plataformas PCIe 4.0 tempranas como AMD X570).',
    historicalEvolution: 'De conjuntos discretos de 10-15 chips TTL a la era dorada de Northbridge/Southbridge (Intel BX, Nvidia nForce) y finalmente al PCH/SoC moderno.',
    pinoutOrBus: 'Conexión con CPU vía enlace DMI 4.0 x8 (Intel ~16 GB/s) o PCIe 4.0 x4 (AMD). Distribuye carriles PCIe hacia ranuras secundarias, puertos SATA y controladores USB.',
    commonIssues: 'Sobrecalentamiento del chipset si el flujo de aire del gabinete es nulo o si queda bloqueado por disipadores de tarjetas gráficas de triple ranura.',
    coordinates: { x: 68, y: 64 }
  },
  {
    id: 12,
    name: 'Puertos SATA (Serial ATA)',
    category: 'expansion',
    tag: 'Almacenamiento Masivo por Cable',
    shortDesc: 'Interfaz serie utilizada para conectar unidades de almacenamiento magnético (HDD), SSDs de 2.5 pulgadas y unidades ópticas.',
    detailedDesc: 'Sustituyó al antiguo cable plano IDE/PATA de 40 u 80 hilos. Emplea señalización diferencial de bajo voltaje en dos pares de hilos transmisor/receptor. Soporta el protocolo AHCI (Advanced Host Controller Interface) con funciones avanzadas como Native Command Queuing (NCQ) y desconexión en caliente (Hot-Plug).',
    electricalSpecs: 'Señalización serie a 6.0 Gbps (SATA III / SATA 6Gb/s), logrando una velocidad práctica máxima sostenida de ~550 a 580 MB/s tras la codificación 8b/10b.',
    historicalEvolution: 'SATA I (2003, 1.5 Gbps, ~150 MB/s), SATA II (2004, 3.0 Gbps, ~300 MB/s) y SATA III (2009, 6.0 Gbps, ~600 MB/s). Relegado hoy a almacenamiento secundario frente a NVMe.',
    pinoutOrBus: 'Conector de datos compacto en forma de L de 7 pines: 3 pines de tierra (GND) y 2 pares diferenciales de transmisión/recepción (TX+, TX-, RX+, RX-).',
    commonIssues: 'Pestañas de retención de cable rotas que provocan desconexiones intermitentes del disco; cables doblados en ángulos rectos forzados que degradan la integridad de señal.',
    coordinates: { x: 80, y: 72 }
  },
  {
    id: 13,
    name: 'Conectores del Panel Frontal (F_PANEL Headers)',
    category: 'control',
    tag: 'Interfaz de Chasis',
    shortDesc: 'Bloque de pines donde se conectan los pulsadores de encendido y reinicio, y los diodos LED del frontal de la torre.',
    detailedDesc: 'Permite al chasis físico interactuar con la placa lógica. Incluye el interruptor de encendido (Power SW), que cierra temporalmente a masa el circuito de encendido enviando un pulso lógico a la placa base para activar la fuente; el interruptor de reinicio (Reset SW); el LED de estado de energía (Power LED) y el LED de actividad de almacenamiento (HDD LED).',
    electricalSpecs: 'Pines de LED operan a ~3.3V o 5V con resistencias limitadoras de corriente integradas en la placa (~15-20 mA). Pines de interruptor son contactos secos lógicos de nivel pull-up.',
    historicalEvolution: 'Originalmente sin estandarización física entre fabricantes (cada marca usaba su propia distribución). Hoy en día la mayoría sigue el diseño estándar Intel Front Panel I/O de 9 pines (F_PANEL).',
    pinoutOrBus: 'Matriz habitual de 9 pines (2x5 con un pin ciego como llave polarizadora): Power SW, Reset SW, Power LED+, Power LED-, HDD LED+, HDD LED-.',
    commonIssues: 'Inversión de polaridad en los LEDs (no encienden al ser diodos unidireccionales); conexión errónea del Power SW en pines de Reset.',
    coordinates: { x: 78, y: 92 }
  },
  {
    id: 14,
    name: 'Batería CMOS (CR2032 de Litio)',
    category: 'control',
    tag: 'Respaldo de Energía RTC/NVRAM',
    shortDesc: 'Pila de botón de litio que mantiene energizado el reloj de tiempo real (RTC) y la memoria volátil de configuración de la BIOS.',
    detailedDesc: 'Cuando el computador se desconecta de la toma de corriente eléctrica de la pared, la pequeña celda de litio suministra los microamperios necesarios para que el oscilador de cuarzo de 32.768 kHz continúe contando la fecha y hora sin interrupción, y para que la memoria SRAM de configuración (que guarda el orden de arranque y los parámetros de overclocking) conserve sus datos.',
    electricalSpecs: 'Celda botón de dióxido de manganeso-litio de 3.0V nominales, capacidad típica de 220-240 mAh. Consumo de corriente del circuito RTC en reposo <5 µA.',
    historicalEvolution: 'En las placas de los años 80 y 90 se usaban baterías cilíndricas soldadas de Níquel-Cadmio (NiCd) que tendían a derramar ácido corrosivo sobre las pistas del PCB con el paso de los años.',
    pinoutOrBus: 'Soporte tipo zócalo con pestaña elástica positiva superior y contacto de fondo negativo conectado a masa.',
    commonIssues: 'Agotamiento tras 3-5 años sin corriente alterna: la computadora pierde la hora del sistema y muestra errores de "CMOS Checksum Error" o "Defaults Loaded" al iniciar.',
    coordinates: { x: 54, y: 72 }
  },
  {
    id: 15,
    name: 'Ranura M.2 (Next Generation Form Factor / NVMe)',
    category: 'expansion',
    tag: 'Almacenamiento Ultrarrápido PCIe',
    shortDesc: 'Ranura compacta de alta velocidad para unidades SSD NVMe conectadas directamente a los carriles PCIe de la CPU o el Chipset.',
    detailedDesc: 'El estándar que transformó el almacenamiento de PC. Utiliza la clave mecánica M-Key (Socket 3) y se conecta habitualmente mediante 4 carriles PCIe (x4). La ranura M.2 principal suele comunicarse directamente con el procesador sin pasar por el chipset, alcanzando anchos de banda descomunales: hasta 8 GB/s en PCIe 4.0 y más de 14.5 GB/s en PCIe 5.0 bajo el protocolo NVMe.',
    electricalSpecs: 'Alimentación exclusiva de 3.3V suministrada por la placa madre (hasta 2.5A a 3A). Admite formatos de tamaño 2242, 2260, 2280 y 22110 (22 mm de ancho por 80 mm de largo el más común).',
    historicalEvolution: 'Reemplazó al formato mSATA y a la fallida interfaz SATA Express alrededor de 2013-2015. Estandarizado por PCI-SIG bajo la especificación M.2 v1.0.',
    pinoutOrBus: 'Conector de borde de 75 pines (con muesca M-Key entre los pines 59 y 66): 4 pares diferenciales PCIe TX/RX, reloj diferencial de referencia, señales SMBus y reset.',
    commonIssues: 'Estrangulamiento térmico (thermal throttling) en SSDs PCIe 4.0 y 5.0 cuando no se instala un disipador de calor adecuado sobre el controlador SSD.',
    coordinates: { x: 50, y: 55 }
  },
  {
    id: 16,
    name: 'Ranura PCI Express x16 (PCIe Graphics Slot)',
    category: 'expansion',
    tag: 'Bus Gráfico Principal',
    shortDesc: 'Ranura de expansión de máxima velocidad diseñada principalmente para la instalación de tarjetas gráficas dedicadas (GPU).',
    detailedDesc: 'Es el puerto de mayor ancho de banda de toda la placa base. Cuenta con 16 líneas de datos serie bidireccionales punto a punto conectadas directamente a los pines del procesador. Incorpora blindaje metálico reforzado soldado a través del PCB ("PCIe Steel Armor") para evitar deformaciones estructurales causadas por el enorme peso de los disipadores de tarjetas gráficas modernas.',
    electricalSpecs: 'Suministra hasta 75W de energía directamente a través de la ranura (66W en el riel de 12V y 9W en el riel de 3.3V). Velocidades: PCIe 3.0 (15.75 GB/s), PCIe 4.0 (31.5 GB/s), PCIe 5.0 (63 GB/s bidireccional).',
    historicalEvolution: 'Sustituyó al bus AGP 8X (2.1 GB/s) en 2004 con la llegada de PCIe 1.0a (4 GB/s). En 20 años el ancho de banda se ha multiplicado por más de 16.',
    pinoutOrBus: '164 pines divididos en dos secciones: sección corta de 22 pines (alimentación 12V/3.3V y señales de control) y sección larga de datos (16 pares TX y 16 pares RX diferenciales).',
    commonIssues: 'Rotura del mecanismo de retención posterior (retención plástica o pulsador Q-Release) al intentar extraer la GPU sin liberar la palanca; caída de ancho de banda a x8 o x4 por pines sucios.',
    coordinates: { x: 34, y: 56 }
  },
  {
    id: 17,
    name: 'Ranura PCI Express x1 (PCIe Expansion Slot)',
    category: 'expansion',
    tag: 'Expansión de Propósito General',
    shortDesc: 'Ranura compacta de un solo carril utilizada para tarjetas auxiliares como adaptadores Wi-Fi, tarjetas de captura o tarjetas de sonido.',
    detailedDesc: 'Utiliza un único carril de datos serie bidireccional conectado casi siempre a través de los carriles secundarios del Chipset (PCH). Al ser una arquitectura modular, cualquier dispositivo PCIe x1 puede insertarse físicamente en ranuras mayores (x4, x8 o x16) y funcionar perfectamente sin adaptadores.',
    electricalSpecs: 'Suministra hasta 10W (o 25W en configuraciones de media altura). Ofrece 1 GB/s por dirección en PCIe 3.0, 2 GB/s en PCIe 4.0 y 4 GB/s en PCIe 5.0.',
    historicalEvolution: 'Diseñada conjuntamente con PCIe x16 en 2004 para reemplazar progresivamente las viejas ranuras PCI de 32 bits y 33 MHz.',
    pinoutOrBus: '36 contactos físicos: 1 par diferencial de transmisión (TX±), 1 par diferencial de recepción (RX±), reloj de referencia de 100 MHz, líneas de alimentación y control.',
    commonIssues: 'Quedar inutilizada físicamente cuando la tarjeta gráfica instalada en la ranura PCIe x16 superior ocupa tres o cuatro ranuras de grosor.',
    coordinates: { x: 34, y: 68 }
  },
  {
    id: 18,
    name: 'Ranura PCI Tradicional (Legado / Legacy PCI 32-bit)',
    category: 'expansion',
    tag: 'Bus Paralelo Histórico',
    shortDesc: 'Bus de expansión tradicional paralelo de 32 bits utilizado durante las décadas de 1990 y 2000 para tarjetas de expansión.',
    detailedDesc: 'Desarrollado por Intel en 1992, fue el pilar de la conectividad en PC durante más de una década. A diferencia de PCIe (que es serie y punto a punto), PCI era un bus paralelo compartido: todos los dispositivos conectados compartían los mismos hilos de datos y competían por el ancho de banda mediante arbitraje, limitando el rendimiento global.',
    electricalSpecs: 'Opera a 33 MHz (o raramente 66 MHz) con un ancho de datos de 32 bits, entregando un ancho de banda total teórico de 133 MB/s compartido entre todas las ranuras. Tensiones de 5V o 3.3V (identificadas por la posición de la muesca).',
    historicalEvolution: 'Sustituyó al bus ISA y VLB en 1993-1994. Se mantuvo presente en placas madre hasta principios de la década de 2010 mediante chips puente PCIe-a-PCI de terceros (como ITE o ASMedia).',
    pinoutOrBus: '124 pines (o 120 pines sin audio): 32 líneas multiplexadas de dirección/datos (AD[31:0]), señales de arbitraje (REQ#/GNT#), reloj de 33 MHz e interrupciones compartidas (INTA#-INTD#).',
    commonIssues: 'Conflictos de interrupciones (IRQ sharing storms) y latencias excesivas en grabación de sonido o captura cuando múltiples tarjetas saturaban el bus compartido.',
    coordinates: { x: 34, y: 80 }
  },
  {
    id: 19,
    name: 'Chip BIOS / UEFI (Firmware SPI Flash ROM)',
    category: 'control',
    tag: 'Firmware de Inicialización',
    shortDesc: 'Circuito integrado de memoria flash no volátil que almacena el firmware responsable del arranque y diagnóstico del hardware.',
    detailedDesc: 'Contiene el código que ejecuta el POST (Power-On Self-Test), inicializa el controlador de memoria, entrena las frecuencias de la RAM, carga el microcódigo del CPU y cede el control al cargador de arranque del sistema operativo. Las placas modernas emplean interfaces UEFI de 64 bits con soporte de Secure Boot, compatibilidad con discos GPT superiores a 2TB y soporte para actualización de firmware por USB sin CPU instalada.',
    electricalSpecs: 'Chip de memoria Flash SPI en encapsulado SOIC-8 o WSON-8, con voltajes lógicos de 1.8V o 3.3V y capacidades típicas de 128 Mb (16 MB) o 256 Mb (32 MB).',
    historicalEvolution: 'De las antiguas memorias ROM y EPROM con ventana ultravioleta de los años 80 a chips Flash reprogramables en placa en los 90, hasta la sustitución de la BIOS IBM PC de 16 bits por el estándar UEFI (Unified Extensible Firmware Interface) a partir de 2011.',
    pinoutOrBus: 'Bus serie SPI (Serial Peripheral Interface): 8 pines que comprenden Chip Select (/CS), Serial Clock (CLK), Serial Input (SI), Serial Output (SO), Write Protect (/WP) y Hold (/HOLD).',
    commonIssues: 'Corrupción durante una actualización eléctrica que deja la placa "brickeada" (inutilizada), solucionable hoy mediante botones BIOS Flashback o chips duales (Dual BIOS).',
    coordinates: { x: 84, y: 82 }
  }
];

// Evolución cronológica de la arquitectura de la placa base
export const GENERATION_ERAS: EraGeneration[] = [
  {
    id: 'era-pre-atx',
    period: '1981 - 1994',
    name: 'Era Pre-ATX y Buses Paralelos',
    subtitle: 'Desde el IBM PC original hasta la estandarización de la arquitectura Baby AT',
    description: 'Las primeras placas base eran circuitos impresos planos ("planar boards") donde casi todas las funciones requerían tarjetas de expansión. La alimentación se hacía mediante conectores duales P8/P9 sin control por software, los procesadores iban en zócalos planos o soldados y no existían puertos de audio, red ni video integrados.',
    keyInnovations: [
      'Nacimiento de la arquitectura modular con ranuras de bus ISA de 8 y 16 bits.',
      'Aparición del concepto de "chipset" para consolidar decenas de chips lógicos discretos en 2-4 circuitos integrados.',
      'Transición de microprocesadores soldados a zócalos LIF/ZIF (Zero Insertion Force) con el Socket 3.',
      'Aparición del bus VESA Local Bus (VLB) para sortear la lentitud del bus ISA en tarjetas de video.'
    ],
    busStandards: 'ISA (8/16-bit, 4.77-8 MHz, 8 MB/s), EISA (32-bit, 33 MB/s), VLB (32-bit, 33-50 MHz, 133 MB/s)',
    memoryTech: 'Chips DIP discretos, seguidos de módulos SIMM de 30 y 72 pines (FPM y EDO RAM)',
    storageTech: 'Controladoras en tarjeta de expansión para disqueteras e interfaz IDE/ATA primitiva (ST-506, IDE de 40 pines a 3.3-8.3 MB/s)',
    formFactors: 'IBM PC/XT, IBM AT (305 × 350 mm), Baby AT (216 × 330 mm)',
    powerStandards: 'Fuentes AT con interruptor mecánico de alto voltaje (110/220V directo en el chasis) y conectores P8/P9',
    representativeModel: 'IBM PC 5150 Planar Board / Intel Premiere/PCI (Batman)',
    chipsetArchitecture: 'Lógica TTL distribuida consolidada más tarde en chipsets de fabricantes pioneros como Chips and Technologies (NEAT) y OPTi.'
  },
  {
    id: 'era-atx-clasica',
    period: '1995 - 2003',
    name: 'Revolución ATX y la Era del Doble Chipset',
    subtitle: 'Nacimiento del estándar ATX por Intel, separación Northbridge/Southbridge y bus AGP',
    description: 'En 1995 Intel publica la especificación ATX, rediseñando la placa base por completo: giró la orientación de los componentes 90 grados para mejorar el flujo térmico, integró los puertos de E/S en una chapa posterior unificada y dotó a la fuente de alimentación de control por software (ACPI / Soft-Off). Se consolidó el modelo de doble chipset: Northbridge para tareas críticas y Southbridge para E/S.',
    keyInnovations: [
      'Factor de forma ATX con conector único de 20 pines y rieles estandarizados de +3.3V, +5V y +12V.',
      'Separación arquitectónica de Northbridge (controlador de memoria + bus de gráficos) y Southbridge.',
      'Aparición del bus dedicado AGP (Accelerated Graphics Port) de 1X hasta 8X para tarjetas 3D.',
      'Adopción de memorias SDRAM DIMM y posterior salto a DDR de doble tasa de transferencia.',
      'Integración masiva en la propia placa de sonido estéreo (AC\'97) y puertos USB 1.1/2.0.'
    ],
    busStandards: 'PCI (32-bit/33 MHz, 133 MB/s), AGP 1X/2X/4X/8X (hasta 2.13 GB/s)',
    memoryTech: 'SDRAM PC66/PC100/PC133 (DIMM 168 pines), RDRAM (Rambus), y DDR-266/333/400 (DIMM 184 pines)',
    storageTech: 'Ultra ATA/33, ATA/66, ATA/100 y ATA/133 (cables planos IDE de 80 hilos), primeros puertos SATA 1.5 Gbps',
    formFactors: 'ATX estándar (305 × 244 mm), MicroATX (244 × 244 mm), FlexATX, Mini-ITX (introducido por VIA en 2001)',
    powerStandards: 'ATX 1.0 a ATX 1.3 con conector de 20 pines; adición del conector auxiliar P4 de 4 pines (+12V para VRM)',
    representativeModel: 'Asus TX97-E / Asus CUSL2 / Abit NF7-S v2.0',
    chipsetArchitecture: 'Northbridge (Memory Controller Hub / MCH) comunicado con Southbridge (ICH) vía bus PCI o buses propietarios (Intel Hub Interface, VIA V-Link, SiS MuTIOL).'
  },
  {
    id: 'era-pcie-uefi',
    period: '2004 - 2014',
    name: 'Llegada de PCI Express, PCH y la Transición a UEFI',
    subtitle: 'Eliminación del Northbridge tradicional, IMC integrado en la CPU y despedida de la BIOS de 16 bits',
    description: 'Esta década presenció la mayor reestructuración de la topología interna del PC: el bus paralelo PCI y el bus AGP fueron reemplazados por el bus serie punto a punto PCI Express. El controlador de memoria (IMC) se trasladó al interior del propio silicio del procesador, haciendo desaparecer el Northbridge clásico y dejando un único chip concentrador (PCH). La arcaica BIOS de 16 bits de 1981 dio paso al firmware gráfico UEFI de 64 bits.',
    keyInnovations: [
      'Adopción de PCI Express (PCIe 1.0, 2.0 y 3.0) con enlaces serie punto a punto escalables (x1, x4, x8, x16).',
      'Integración del IMC y las líneas PCIe primarias en el procesador (AMD K8/K10 e Intel Nehalem/Sandy Bridge).',
      'El chipset se transforma en PCH (Platform Controller Hub) conectado por DMI (Direct Media Interface).',
      'Transición de la BIOS clásica en modo real a UEFI con compatibilidad de particiones GPT superiores a 2 TB.',
      'Generalización del conector ATX de 24 pines y conectores EPS de 8 pines dedicados al CPU.'
    ],
    busStandards: 'PCIe 1.1 (2.5 GT/s, 4 GB/s x16), PCIe 2.0 (5 GT/s, 8 GB/s x16), PCIe 3.0 (8 GT/s, 15.75 GB/s x16)',
    memoryTech: 'DDR2 (533-800 MHz), DDR3 (1066-2133 MHz) en configuraciones Dual-Channel y Triple/Quad-Channel',
    storageTech: 'SATA II (3 Gb/s), SATA III (6 Gb/s) con soporte AHCI nativo; aparición de las primeras ranuras mSATA y M.2 SATA',
    formFactors: 'ATX, MicroATX, Mini-ITX consolidado para equipos compactos, desaparición del fallido formato BTX de Intel',
    powerStandards: 'ATX12V v2.0 - v2.4 (conector principal de 24 pines, EPS12V de 8 pines, eficiencia 80 PLUS)',
    representativeModel: 'Asus P5B Deluxe / DFI LANParty UT NF4 SLI-DR / Asus Sabertooth Z77',
    chipsetArchitecture: 'Arquitectura PCH unificada; el procesador asume las funciones de alta velocidad (DRAM y GPU) y el PCH gestiona E/S periférica.'
  },
  {
    id: 'era-moderna',
    period: '2015 - 2026+',
    name: 'Alta Densidad, PCIe 5.0/6.0, DDR5 y Conectores Ocultos BTF',
    subtitle: 'Fases de alimentación digitales extremas, SSDs NVMe de más de 14 GB/s y revolución estética sin cables',
    description: 'Las placas base actuales son obras maestras de ingeniería de alta frecuencia y microelectrónica de precisión. Con PCBs de 8 a 12 capas con cobre de 2 onzas, alimentan procesadores que sobrepasan los 300W con VRMs de más de 24 fases con etapas de potencia DrMOS de hasta 105A. El almacenamiento NVMe M.2 Gen 5 y la memoria DDR5 con PMIC integrado conviven con la nueva revolución de factores de forma con conectores ocultos traseros (ASUS BTF, MSI Project Zero).',
    keyInnovations: [
      'PCI Express 4.0 y 5.0 (hasta 32 GT/s por línea, 63 GB/s en x16) y primeros despliegues de PCIe 6.0 con señalización PAM4.',
      'Memoria DDR5 con bus de dos subcanales de 32 bits, ECC en el silicio (on-die ECC) y gestión energética PMIC integrada en el módulo.',
      'Ranuras M.2 NVMe conectadas a carriles PCIe Gen 5 que superan los 14.500 MB/s de lectura sostenida.',
      'Módulos reguladores de voltaje (VRM) inteligentes con etapas digitales Smart Power Stage (SPS) de más de 100A refrigeradas con heatpipes de contacto directo.',
      'Factores de forma DIY-APE / BTF (Back-To-Future) con todos los conectores de alimentación y E/S en la parte posterior del PCB.',
      'Conectividad de vanguardia: Wi-Fi 7 (802.11be a 320 MHz), Ethernet 10G y puertos Thunderbolt 4/5 / USB4 de 80-120 Gbps.'
    ],
    busStandards: 'PCIe 4.0 (16 GT/s), PCIe 5.0 (32 GT/s, 63 GB/s x16), PCIe 6.0 (64 GT/s con codificación PAM4 y FLITs)',
    memoryTech: 'DDR4-3200 a 4400+ y DDR5-4800 a 8400+ MT/s con soporte Intel XMP 3.0 y AMD EXPO; perfiles CAMM2 en pruebas',
    storageTech: 'SSD NVMe M.2 PCIe 4.0 x4 (hasta 7.500 MB/s) y PCIe 5.0 x4 (hasta 14.500 MB/s); SATA III queda para archivado masivo',
    formFactors: 'ATX, MicroATX, Mini-ITX, E-ATX entusiasta, y los nuevos estándares con cables traseros: ASUS BTF, MSI Project Zero',
    powerStandards: 'ATX 3.0 / ATX 3.1 con conectores 12V-2x6 de 600W; soporte de transitorios de potencia de hasta el 200%',
    representativeModel: 'MSI MEG Z790 GODLIKE / ASUS ROG Crosshair X870E HERO / ASUS ROG Maximus Z890 Hero BTF',
    chipsetArchitecture: 'Plataformas altamente modulares (SoC) con enlace PCIe 4.0 x4 / x8 hacia chipsets multipuck (ej. AMD Promontory 21 dual en X670E/X870E) y conectividad directa de hasta 28 carriles PCIe desde la CPU.'
  }
];

// Modelos históricos icónicos que marcaron un hito en la industria
export const LEGENDARY_MODELS: MotherboardModel[] = [
  {
    id: 'ibm-pc-5150',
    name: 'IBM PC 5150 Planar Board',
    year: 1981,
    era: 'era-pre-atx',
    manufacturer: 'IBM',
    socket: 'DIP de 40 pines (soldado)',
    chipset: 'Lógica discreta Intel (8259A PIC, 8253 PIT, 8237 DMA)',
    memorySupport: '16 KB a 64 KB en placa (ampliable a 256 KB vía ranuras)',
    expansionSlots: '5 ranuras de bus de expansión IBM de 8 bits (ancestro de ISA a 4.77 MHz)',
    storageInterfaces: 'Puerto DIN de cassette de audio + tarjeta controladora de disquetera de 5.25"',
    formFactor: 'IBM PC Original (305 × 350 mm aprox.)',
    significance: 'La madre de todas las placas base de computador personal; definió el concepto de arquitectura abierta y ampliable.',
    historicalContext: 'Diseñada por el equipo de Don Estridge en Boca Raton, Florida. En lugar de diseñar chips propietarios cerrados, IBM utilizó componentes estándar de mercado, lo que propició la explosión de la industria de los clones IBM PC compatibles.',
    highlights: [
      'Primer diseño comercial en masa con bus de expansión multipropósito.',
      'No contaba con BIOS en memoria Flash; utilizaba una ROM de 40 KB con BASIC de Microsoft integrado.',
      'Carecía de puertos integrados: incluso la salida a pantalla requería una tarjeta MDA o CGA en una ranura.'
    ],
    specs: {
      fsbOrInterconnect: 'Bus de sistema a 4.77 MHz',
      maxRam: '64 KB en placa base (hasta 640 KB totales del sistema)',
      vrmPhases: 'Regulación lineal simple de 5V/12V desde la fuente',
      powerConnector: 'Conector de alimentación patentado de 12 pines'
    }
  },
  {
    id: 'intel-batman-premiere',
    name: 'Intel Premiere/PCI (Batman)',
    year: 1993,
    era: 'era-pre-atx',
    manufacturer: 'Intel',
    socket: 'Socket 4 (273 pines PGA)',
    chipset: 'Intel 430LX (Mercury)',
    memorySupport: 'Hasta 128 MB FPM RAM en 4 zócalos SIMM de 72 pines',
    expansionSlots: '3 ranuras PCI de 32 bits a 33 MHz + 4 ranuras ISA de 16 bits',
    storageInterfaces: '2 canales IDE ATA integrados (soporte para 4 discos)',
    formFactor: 'Baby AT (220 × 330 mm)',
    significance: 'Primera placa base de Intel en comercializar con éxito el bus PCI para los revolucionarios procesadores Pentium.',
    historicalContext: 'Intel tomó la decisión estratégica de diseñar y fabricar sus propias placas base para acelerar la adopción en el mercado de su nuevo procesador Pentium de 60/66 MHz y su estándar de bus PCI frente al envejecido bus VESA Local Bus.',
    highlights: [
      'Estableció a Intel no solo como fabricante de CPUs, sino como el mayor diseñador de placas base del planeta.',
      'Soporte nativo para bus PCI de 32 bits a 33 MHz con ancho de banda de 133 MB/s.',
      'Controladora de teclado y puertos serie/paralelo integrados en placa por primera vez.'
    ],
    specs: {
      fsbOrInterconnect: 'Front Side Bus a 60 / 66 MHz',
      maxRam: '128 MB (módulos SIMM FPM)',
      vrmPhases: 'Regulador lineal de 5V a 3.3V',
      powerConnector: 'Conectores gemelos AT P8/P9'
    }
  },
  {
    id: 'asus-tx97-e',
    name: 'ASUS TX97-E',
    year: 1997,
    era: 'era-atx-clasica',
    manufacturer: 'ASUS',
    socket: 'Socket 7 (321 pines ZIF)',
    chipset: 'Intel 430TX (PCIset)',
    memorySupport: 'Hasta 256 MB (soporte combinado de SIMM 72 pines y DIMM 168 pines SDRAM)',
    expansionSlots: '4 ranuras PCI + 3 ranuras ISA de 16 bits',
    storageInterfaces: 'Ultra DMA/33 (Ultra ATA de 33 MB/s)',
    formFactor: 'Baby AT / ATX (versiones disponibles)',
    significance: 'Consolidó a ASUS como el fabricante predilecto de entusiastas por su estabilidad, diseño de pistas y soporte SDRAM.',
    historicalContext: 'La plataforma Socket 7 fue el último estándar universal donde convivieron CPUs de múltiples fabricantes: Intel Pentium MMX, AMD K6 y Cyrix 6x86, todos funcionando en la misma placa base.',
    highlights: [
      'Permitió la transición entre memoria SIMM antigua y los modernos módulos SDRAM de 168 pines a 66 MHz.',
      'Incorporó la tecnología ASUS Media Bus para tarjetas combinadas de sonido y SCSI.',
      'Soporte para modos de ahorro de energía ACPI y puertos USB 1.0 mediante cabezal auxiliar.'
    ],
    specs: {
      fsbOrInterconnect: 'Bus de sistema a 66 / 75 / 83 MHz',
      maxRam: '256 MB SDRAM / EDO',
      vrmPhases: 'Regulador conmutado lineal con disipador pasivo',
      powerConnector: 'Soporte híbrido AT (P8/P9) y conector ATX de 20 pines'
    }
  },
  {
    id: 'asus-cusl2-black-pearl',
    name: 'ASUS CUSL2-C Black Pearl',
    year: 2000,
    era: 'era-atx-clasica',
    manufacturer: 'ASUS',
    socket: 'Socket 370',
    chipset: 'Intel 815EP (Solano)',
    memorySupport: 'Hasta 512 MB PC133 SDRAM (3 zócalos DIMM)',
    expansionSlots: '1 ranura AGP 4X Pro + 6 ranuras PCI de 32 bits',
    storageInterfaces: 'Dual Ultra ATA/100 (100 MB/s)',
    formFactor: 'ATX estándar (305 × 208 mm)',
    significance: 'El pináculo de la era Pentium III; rescató a la industria del fiasco de la memoria Rambus RDRAM.',
    historicalContext: 'Intel intentó forzar la costosa memoria RDRAM con el chipset i820. El enorme rechazo popular y problemas técnicos obligaron al lanzamiento del chipset i815 con memoria SDRAM tradicional. La versión "Black Pearl" con PCB negro brillante fue pionera en la estética de hardware moderno.',
    highlights: [
      'Primer PCB negro estilizado de colección en una época donde todas las placas eran verde o marrón pálido.',
      'Excelente capacidad de overclocking para procesadores Pentium III Coppermine y Celeron Tualatin.',
      'Bus AGP 4X con alimentación universal a 1.5V para tarjetas aceleradoras 3dfx Voodoo y Nvidia GeForce.'
    ],
    specs: {
      fsbOrInterconnect: 'FSB de 66 a 166+ MHz ajustable en pasos de 1 MHz',
      maxRam: '512 MB PC133 SDRAM',
      vrmPhases: 'VRM de 3 fases con condensadores electrolíticos',
      powerConnector: 'Conector ATX estándar de 20 pines'
    }
  },
  {
    id: 'abit-nf7-s-v2',
    name: 'Abit NF7-S v2.0',
    year: 2003,
    era: 'era-atx-clasica',
    manufacturer: 'Abit',
    socket: 'Socket A (Socket 462)',
    chipset: 'Nvidia nForce2 Ultra 400 + MCP-T',
    memorySupport: 'Hasta 3 GB Dual-Channel DDR-400 (PC3200)',
    expansionSlots: '1 ranura AGP 8X (0.8V) + 5 ranuras PCI',
    storageInterfaces: '2 puertos SATA 1.5 Gbps (controladora Silicon Image) + 2 puertos PATA/133',
    formFactor: 'ATX estándar',
    significance: 'Considerada por la comunidad como una de las mejores placas base de overclocking de toda la historia del hardware.',
    historicalContext: 'En la feroz batalla entre el Pentium 4 de Intel y el Athlon XP de AMD, el chipset nForce2 Ultra de Nvidia ofreció un controlador de memoria de doble canal inigualable y el procesador de sonido SoundStorm con codificación Dolby Digital en tiempo real.',
    highlights: [
      'Bios SoftMenu exclusiva de Abit con control granular de voltajes de VCore, VDIMM y VDD.',
      'Arquitectura de memoria Dual-Channel que duplicaba el ancho de banda del bus a 6.4 GB/s.',
      'Procesador de audio Nvidia SoundStorm con aceleración por hardware superior a tarjetas dedicadas.'
    ],
    specs: {
      fsbOrInterconnect: 'FSB oficial de 400 MHz (200 MHz DDR), alcanzando más de 250 MHz en OC',
      maxRam: '3 GB DDR-400',
      vrmPhases: 'VRM de 3 fases con inductores de bobinado toroidal',
      powerConnector: 'Conector ATX 20 pines + conector auxiliar de 4 pines de 12V'
    }
  },
  {
    id: 'dfi-lanparty-nf4-sli',
    name: 'DFI LANParty UT NF4 SLI-DR',
    year: 2005,
    era: 'era-pcie-uefi',
    manufacturer: 'DFI (Diamond Flower Inc.)',
    socket: 'Socket 939',
    chipset: 'Nvidia nForce4 SLI',
    memorySupport: 'Hasta 4 GB Dual-Channel DDR-400 (overclocking a más de DDR-600)',
    expansionSlots: '2 ranuras PCI Express x16 (operando a x8/x8 en modo SLI) + 2 ranuras PCIe x1 + 2 PCI',
    storageInterfaces: '4 puertos SATA II de 3 Gbps nativos con RAID + 4 puertos SATA adicionales Silicon Image',
    formFactor: 'ATX estándar',
    significance: 'El icono de la cultura "LAN Party" y del overclocking extremo de la época del Athlon 64 de 64 bits.',
    historicalContext: 'Los procesadores AMD Athlon 64 aplastaron al Pentium 4 de Intel en rendimiento y eficiencia gracias a su arquitectura con IMC integrado y enlace HyperTransport. DFI construyó una placa con componentes reactivos a luz ultravioleta (UV) y capacidad de alimentar las memorias DDR a voltajes extremos de 4.0V.',
    highlights: [
      'Ranuras y conectores plásticos reactivos que brillaban intensamente bajo tubos de luz ultravioleta.',
      'Soporte para configuraciones gráficas duales Nvidia SLI mediante jumpers mecánicos dedicados.',
      'VRM de 4 fases sobrediseñado con MOSFETs de ultra baja resistencia para el procesador y la memoria.'
    ],
    specs: {
      fsbOrInterconnect: 'Enlace HyperTransport a 1000 MHz (2000 MT/s, 8 GB/s bidireccional)',
      maxRam: '4 GB DDR-400 en 4 ranuras DIMM',
      vrmPhases: '4 fases de alta potencia con disipador magnético en chipset',
      powerConnector: 'ATX de 24 pines + EPS 4 pines + Molex de 4 pines y conector FDD para estabilidad PCIe'
    }
  },
  {
    id: 'asus-p5b-deluxe',
    name: 'ASUS P5B Deluxe / WiFi-AP',
    year: 2006,
    era: 'era-pcie-uefi',
    manufacturer: 'ASUS',
    socket: 'LGA 775',
    chipset: 'Intel P965 + ICH8R',
    memorySupport: 'Hasta 8 GB Dual-Channel DDR2-800 / DDR2-1066',
    expansionSlots: '2 ranuras PCIe x16 (x16/x4 para ATI CrossFire) + 1 PCIe x1 + 3 PCI',
    storageInterfaces: '6 puertos SATA II 3 Gbps + 1 puerto eSATA exterior + 1 canal IDE',
    formFactor: 'ATX estándar',
    significance: 'La plataforma que consagró el reinado de la arquitectura Intel Core 2 Duo (Conroe).',
    historicalContext: 'Intel abandonó la ineficiente microarquitectura NetBurst (Pentium D/4) y presentó los revolucionarios Core 2 Duo. La ASUS P5B Deluxe fue el estándar dorado que permitió duplicar la frecuencia de trabajo de los procesadores mediante overclocking del FSB de 266 MHz a más de 500 MHz.',
    highlights: [
      'VRM de 8 fases con bobinas blindadas y condensadores poliméricos sólidos de larga duración.',
      'Sistema de refrigeración pasivo por tubos de calor (heatpipe) de cobre que unía el VRM con el Northbridge.',
      'Puntos de control de voltaje y tarjeta Wi-Fi integrada en el propio panel posterior.'
    ],
    specs: {
      fsbOrInterconnect: 'FSB oficial de 1066 MHz, alcanzando más de 2000 MHz en overclocking',
      maxRam: '8 GB DDR2',
      vrmPhases: 'VRM digital de 8 fases con MOSFETs de bajo RDS(on)',
      powerConnector: 'ATX de 24 pines + EPS de 8 pines'
    }
  },
  {
    id: 'asus-sabertooth-z77',
    name: 'ASUS SABERTOOTH Z77',
    year: 2012,
    era: 'era-pcie-uefi',
    manufacturer: 'ASUS TUF',
    socket: 'LGA 1155',
    chipset: 'Intel Z77 Express',
    memorySupport: 'Hasta 32 GB Dual-Channel DDR3-1866 / 2400(OC)',
    expansionSlots: '2 ranuras PCIe 3.0 x16 (x16 o x8/x8) + 1 PCIe 2.0 x16 (modo x4) + 3 PCIe 2.0 x1',
    storageInterfaces: '2 puertos SATA 6 Gbps (Z77) + 2 puertos SATA 6 Gbps (ASMedia) + 4 SATA 3 Gbps',
    formFactor: 'ATX estándar',
    significance: 'Pionera en el concepto de "blindaje térmico" (Thermal Armor), componentes militares y firmware UEFI maduro.',
    historicalContext: 'Acompañó a los legendarios procesadores Sandy Bridge (i7-2600K) e Ivy Bridge (i7-3770K). Destacó por su estética militar con una cubierta plástica completa que guiaba el flujo de aire generado por microventiladores auxiliares a través de los componentes más calientes de la placa.',
    highlights: [
      'Thermal Armor completo con sensores térmicos integrados (Thermal Radar) en 12 zonas del PCB.',
      'Soporte completo para PCI Express 3.0 con el doble de ancho de banda por carril (1 GB/s por carril).',
      'Firmware UEFI totalmente gráfico con navegación por ratón y perfiles de ventilación automáticos.'
    ],
    specs: {
      fsbOrInterconnect: 'Enlace DMI 2.0 x4 (4 GB/s bidireccional) al PCH',
      maxRam: '32 GB DDR3',
      vrmPhases: 'Diseño DIGI+ VRM de 8+4 fases con condensadores certificados de grado militar',
      powerConnector: 'ATX de 24 pines + EPS de 8 pines'
    }
  },
  {
    id: 'asus-crosshair-vi-hero',
    name: 'ASUS ROG Crosshair VI Hero',
    year: 2017,
    era: 'era-moderna',
    manufacturer: 'ASUS ROG',
    socket: 'Socket AM4 (1331 pines PGA)',
    chipset: 'AMD X370',
    memorySupport: 'Hasta 64 GB Dual-Channel DDR4-3200+',
    expansionSlots: '2 ranuras PCIe 3.0 x16 con blindaje SafeSlot + 1 PCIe 2.0 x16 (modo x4) + 3 PCIe 2.0 x1',
    storageInterfaces: '1 ranura M.2 PCIe 3.0 x4 NVMe + 8 puertos SATA 6 Gbps',
    formFactor: 'ATX estándar',
    significance: 'El renacimiento de AMD en la alta gama con los procesadores Ryzen y el zócalo AM4 más duradero de la historia.',
    historicalContext: 'Tras casi una década de dominio abrumador de Intel con la saga Core i7, AMD lanzó en marzo de 2017 su arquitectura Zen de 8 núcleos a precios accesibles. La Crosshair VI Hero fue la placa insignia del lanzamiento, iniciando un reinado del zócalo AM4 que se extendió durante más de 5 años.',
    highlights: [
      'VRM de 8+4 fases con etapas de potencia NexFET de Texas Instruments capaces de manejar los Ryzen de 8 núcleos.',
      'Agujeros de montaje duales compatibles tanto con disipadores AM3 como AM4.',
      'Botones de inicio rápido en placa, pantalla LED de código POST y botón BIOS Flashback.'
    ],
    specs: {
      fsbOrInterconnect: 'Infinity Fabric interconector y PCIe 3.0 x4 uplink hacia chipset',
      maxRam: '64 GB DDR4',
      vrmPhases: '8+4 fases con controlador PWM digital y disipadores de aluminio sobredimensionados',
      powerConnector: 'ATX de 24 pines + EPS de 8 pines + EPS de 4 pines'
    }
  },
  {
    id: 'asus-maximus-z890-btf',
    name: 'ASUS ROG Maximus Z890 Hero BTF',
    year: 2024,
    era: 'era-moderna',
    manufacturer: 'ASUS ROG',
    socket: 'LGA 1851',
    chipset: 'Intel Z890',
    memorySupport: 'Hasta 192 GB DDR5-8800+ MT/s (módulos CUDIMM)',
    expansionSlots: '1 ranura PCIe 5.0 x16 (ranura de alta potencia con ranura para gráficos BTF de hasta 600W) + PCIe 4.0 x4',
    storageInterfaces: '3 ranuras M.2 PCIe 5.0 x4 + 3 ranuras M.2 PCIe 4.0 x4 + 4 puertos SATA 6 Gbps',
    formFactor: 'ATX con diseño BTF (Back-To-Future con conectores traseros)',
    significance: 'Representa la cumbre de la tecnología moderna: arquitectura sin cables frontales, PCIe 5.0 integral y Thunderbolt 5.',
    historicalContext: 'Diseñada para los procesadores Intel Core Ultra 200S (Arrow Lake). Resuelve el problema histórico del desorden de cables en el chasis al reubicar el conector de 24 pines, los conectores EPS y los puertos de ventiladores en la parte trasera del PCB.',
    highlights: [
      'Factor de forma BTF con conector de alimentación de GPU directo en la placa base (hasta 600W sin cables expuestos).',
      'VRM colosal de 20+1+2 fases con etapas Smart Power Stage de 110A y disipador de M.2 con montaje sin tornillos Q-Latch.',
      'Conectividad de última generación: 2 puertos Thunderbolt 5 (hasta 120 Gbps), Wi-Fi 7 y LAN de 5 GbE.'
    ],
    specs: {
      fsbOrInterconnect: 'Enlace DMI 4.0 x8 (15.75 GB/s por dirección) al chipset Z890',
      maxRam: '192 GB DDR5 con soporte de memoria CUDIMM con generador de reloj integrado',
      vrmPhases: '20+1+2 fases digitales con capacitores metálicos negros de 10K',
      powerConnector: 'Conectores traseros: ATX 24 pines, dual 8 pines EPS, conector PCIe 12V-2x6 de alta corriente'
    }
  }
];

// Datos de evolución de ancho de banda de buses de expansión (verificables según PCI-SIG e IEEE)
export const EXPANSION_BUS_BENCHMARKS: BenchmarkDataPoint[] = [
  { generation: 'ISA (8-bit)', year: 1981, bandwidthMBs: 2.38, relativeGain: 'Base', notes: '4.77 MHz con bus de 8 bits en IBM PC original' },
  { generation: 'ISA (16-bit AT)', year: 1984, bandwidthMBs: 8.33, relativeGain: '3.5x', notes: '8 MHz a 16 bits en IBM PC/AT' },
  { generation: 'EISA / MCA', year: 1988, bandwidthMBs: 33.3, relativeGain: '14x', notes: 'Bus extendido de 32 bits a 8.33 MHz' },
  { generation: 'VESA Local Bus (VLB)', year: 1992, bandwidthMBs: 133.0, relativeGain: '56x', notes: 'Sincronizado a reloj de CPU 486 (33 MHz, 32-bit)' },
  { generation: 'PCI (32-bit/33MHz)', year: 1993, bandwidthMBs: 133.3, relativeGain: '56x', notes: 'Estándar paralelo universal compartido' },
  { generation: 'AGP 1X', year: 1997, bandwidthMBs: 266.6, relativeGain: '112x', notes: 'Bus gráfico dedicado punto a punto a 66 MHz' },
  { generation: 'AGP 4X', year: 2000, bandwidthMBs: 1066.0, relativeGain: '448x', notes: 'Cuádruple bombeo a 1.5V para 3D intensivo' },
  { generation: 'AGP 8X', year: 2002, bandwidthMBs: 2133.0, relativeGain: '896x', notes: 'Límite de la arquitectura paralela AGP a 0.8V' },
  { generation: 'PCIe 1.0 (x16)', year: 2004, bandwidthMBs: 4000.0, relativeGain: '1,680x', notes: 'Primer enlace serie diferencial (2.5 GT/s, codificación 8b/10b)' },
  { generation: 'PCIe 2.0 (x16)', year: 2007, bandwidthMBs: 8000.0, relativeGain: '3,361x', notes: 'Duplicación de tasa a 5.0 GT/s por carril' },
  { generation: 'PCIe 3.0 (x16)', year: 2010, bandwidthMBs: 15754.0, relativeGain: '6,619x', notes: '8.0 GT/s con codificación eficiente 128b/130b' },
  { generation: 'PCIe 4.0 (x16)', year: 2019, bandwidthMBs: 31508.0, relativeGain: '13,238x', notes: '16.0 GT/s adoptado con AMD X570' },
  { generation: 'PCIe 5.0 (x16)', year: 2021, bandwidthMBs: 63016.0, relativeGain: '26,477x', notes: '32.0 GT/s por carril en Intel Z690 y AMD AM5' },
  { generation: 'PCIe 6.0 (x16)*', year: 2024, bandwidthMBs: 126032.0, relativeGain: '52,954x', notes: '64.0 GT/s con modulación de 4 niveles PAM4 y FLITs' }
];

// Evolución de la tasa de transferencia de la memoria RAM (JEDEC)
export const MEMORY_BENCHMARKS = [
  { tech: 'FPM RAM', year: 1990, speedMTs: 25, bandwidthGBs: 0.05, voltage: '5.0V', form: 'SIMM 30-pin' },
  { tech: 'EDO RAM', year: 1995, speedMTs: 40, bandwidthGBs: 0.16, voltage: '5.0V / 3.3V', form: 'SIMM 72-pin' },
  { tech: 'SDR SDRAM PC100', year: 1998, speedMTs: 100, bandwidthGBs: 0.80, voltage: '3.3V', form: 'DIMM 168-pin' },
  { tech: 'SDR SDRAM PC133', year: 2000, speedMTs: 133, bandwidthGBs: 1.06, voltage: '3.3V', form: 'DIMM 168-pin' },
  { tech: 'DDR-400 (PC3200)', year: 2002, speedMTs: 400, bandwidthGBs: 3.20, voltage: '2.5V', form: 'DIMM 184-pin' },
  { tech: 'DDR2-800 (PC2-6400)', year: 2006, speedMTs: 800, bandwidthGBs: 6.40, voltage: '1.8V', form: 'DIMM 240-pin' },
  { tech: 'DDR3-1600 (PC3-12800)', year: 2010, speedMTs: 1600, bandwidthGBs: 12.80, voltage: '1.5V', form: 'DIMM 240-pin' },
  { tech: 'DDR4-3200 (PC4-25600)', year: 2016, speedMTs: 3200, bandwidthGBs: 25.60, voltage: '1.2V', form: 'DIMM 288-pin' },
  { tech: 'DDR5-6400 (PC5-51200)', year: 2022, speedMTs: 6400, bandwidthGBs: 51.20, voltage: '1.1V', form: 'DIMM 288-pin (PMIC)' },
  { tech: 'DDR5-8400 (CUDIMM)*', year: 2024, speedMTs: 8400, bandwidthGBs: 67.20, voltage: '1.1V+', form: 'CUDIMM con CKD' }
];

// Evolución de la velocidad de almacenamiento en placa
export const STORAGE_BENCHMARKS = [
  { standard: 'IDE ATA-1', year: 1990, speedMBs: 8.3, bus: 'Paralelo Ribbon 40-pin' },
  { standard: 'Ultra ATA/33', year: 1997, speedMBs: 33.3, bus: 'Paralelo DMA' },
  { standard: 'Ultra ATA/100', year: 2000, speedMBs: 100.0, bus: 'Paralelo Ribbon 80-pin' },
  { standard: 'SATA I', year: 2003, speedMBs: 150.0, bus: 'Serie 7-pin (1.5 Gbps)' },
  { standard: 'SATA II', year: 2004, speedMBs: 300.0, bus: 'Serie 7-pin (3.0 Gbps)' },
  { standard: 'SATA III', year: 2009, speedMBs: 600.0, bus: 'Serie 7-pin (6.0 Gbps)' },
  { standard: 'M.2 PCIe 3.0 x4', year: 2015, speedMBs: 3500.0, bus: 'PCIe x4 (NVMe 1.2)' },
  { standard: 'M.2 PCIe 4.0 x4', year: 2019, speedMBs: 7500.0, bus: 'PCIe x4 (NVMe 1.4)' },
  { standard: 'M.2 PCIe 5.0 x4', year: 2022, speedMBs: 14500.0, bus: 'PCIe x4 (NVMe 2.0)' }
];

// Comparativa de Factores de Forma (Form Factors)
export const FORM_FACTORS: FormFactorSpec[] = [
  {
    name: 'E-ATX (Extended ATX)',
    dimensionsMm: '305 × 330 mm',
    dimensionsInches: '12.0 × 13.0 in',
    expansionSlotsMax: 7,
    ramSlotsTypical: '4 a 8 ranuras (Quad-Channel común)',
    targetMarket: 'Estaciones de trabajo, entusiastas extremos, creadores de contenido',
    description: 'El factor de forma más grande para consumo. Permite alojar circuitería VRM monstruosa, múltiples ranuras PCIe blindadas espaciadas para varias tarjetas y hasta 5 ranuras M.2 con disipación pasiva colosal.'
  },
  {
    name: 'ATX Estándar',
    dimensionsMm: '305 × 244 mm',
    dimensionsInches: '12.0 × 9.6 in',
    expansionSlotsMax: 7,
    ramSlotsTypical: '4 ranuras (Dual-Channel)',
    targetMarket: 'Estándar universal para ordenadores de sobremesa y gaming de alto rendimiento',
    description: 'El rey indiscutible de las cajas torre desde su introducción por Intel en 1995. Proporciona el balance perfecto entre capacidad de expansión (hasta 3-4 ranuras M.2 y múltiples ranuras PCIe) y compatibilidad de chasis.'
  },
  {
    name: 'MicroATX (mATX)',
    dimensionsMm: '244 × 244 mm',
    dimensionsInches: '9.6 × 9.6 in',
    expansionSlotsMax: 4,
    ramSlotsTypical: '2 a 4 ranuras (Dual-Channel)',
    targetMarket: 'Equipos compactos, oficinas, presupuestos optimizados y gaming equilibrado',
    description: 'Diseño cuadrado económico y muy versátil. Comparte los mismos puntos de anclaje que ATX pero prescinde de las 3 ranuras de expansión inferiores, permitiendo cajas mucho más compactas sin sacrificar potencia.'
  },
  {
    name: 'Mini-ITX',
    dimensionsMm: '170 × 170 mm',
    dimensionsInches: '6.7 × 6.7 in',
    expansionSlotsMax: 1,
    ramSlotsTypical: '2 ranuras (Dual-Channel)',
    targetMarket: 'Equipos ultracompactos (SFF / Small Form Factor), consolas de salón, HTPC',
    description: 'Desarrollado inicialmente por VIA Technologies en 2001. Integra todo lo necesario en una superficie mínima de 17 cm por lado. Requiere PCBs de 10 a 12 capas y tarjetas auxiliares montadas verticalmente tipo "hija" (daughterboards) para audio y M.2.'
  }
];

export interface TimelineMilestone {
  id: string;
  year: number;
  title: string;
  eraId: string;
  badge: string;
  formFactor: string;
  architecturalLeap: string;
  busAndInterconnect: string;
  memoryType: string;
  powerSpecs: string;
  representativeBoard: string;
  details: string;
  keyTechnicalImpact: string[];
  comparisonMetric: {
    busSpeed: string;
    ramBandwidth: string;
    maxPower: string;
    storageSpeed: string;
  };
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'm-1981',
    year: 1981,
    title: 'Nacimiento de la Arquitectura Abierta (IBM PC 5150)',
    eraId: 'era-pre-atx',
    badge: 'Hito Fundacional',
    formFactor: 'IBM PC Planar Board (305 × 350 mm)',
    architecturalLeap: 'Primer circuito impreso en masa con ranuras de expansión estandarizadas para periféricos de terceros.',
    busAndInterconnect: 'Bus IBM PC de 8 bits a 4.77 MHz (2.38 MB/s)',
    memoryType: 'Chips DIP discretos de 16 KB a 64 KB en placa base',
    powerSpecs: 'Fuente IBM original de 63.5W con conector plano propietario de 12 pines',
    representativeBoard: 'IBM PC 5150 Planar Board',
    details: 'IBM rompió con los diseños cerrados de Apple y Commodore al publicar los esquemas de su placa base. No disponía de puertos de video o sonido integrados; cada función requería una tarjeta de expansión sobre el bus de 8 bits.',
    keyTechnicalImpact: [
      'Definió el concepto de ranura de expansión (expansion slot) intercambiable.',
      'Lógica discreta basada en chips estándar de Intel (8259A PIC, 8253 PIT, 8237 DMA).',
      'Sin BIOS en flash: código almacenado en 40 KB de memoria ROM con Microsoft BASIC.'
    ],
    comparisonMetric: {
      busSpeed: '2.38 MB/s (Bus 8-bit)',
      ramBandwidth: '0.01 GB/s',
      maxPower: '63.5W totales del sistema',
      storageSpeed: 'Disquetera 5.25" (~0.03 MB/s)'
    }
  },
  {
    id: 'm-1984',
    year: 1984,
    title: 'Estandarización del Bus AT de 16 Bits (IBM PC/AT)',
    eraId: 'era-pre-atx',
    badge: 'Evolución de Formato',
    formFactor: 'Full AT (305 × 350 mm)',
    architecturalLeap: 'Duplicación del ancho de bus a 16 bits y conector DIN de teclado en el chasis.',
    busAndInterconnect: 'Bus ISA de 16 bits a 8 MHz (8.33 MB/s)',
    memoryType: 'Módulos SIP/DIP y soporte ampliado para 286 en modo protegido',
    powerSpecs: 'Conectores gemelos P8 y P9 (+5V, +12V, -5V, -12V)',
    representativeBoard: 'IBM PC/AT 5170 Motherboard',
    details: 'El formato Full AT gobernó la industria inicial de clones. Sin embargo, su conector de alimentación dividido en dos enchufes P8 y P9 provocaba cortocircuitos catastróficos si se conectaban con los cables negros invertidos hacia afuera.',
    keyTechnicalImpact: [
      'Estableció el bus ISA de 16 bits que dominó las tarjetas de sonido y red por más de una década.',
      'Soporte de reloj en tiempo real (RTC) con celda de respaldo.',
      'El enorme tamaño del chasis Full AT impulsó la demanda de placas más compactas.'
    ],
    comparisonMetric: {
      busSpeed: '8.33 MB/s (ISA 16-bit)',
      ramBandwidth: '0.03 GB/s',
      maxPower: '192W PSU',
      storageSpeed: 'Disco duro ST-506 MFM (~0.6 MB/s)'
    }
  },
  {
    id: 'm-1989',
    year: 1989,
    title: 'La Era Baby AT y la Invención del Chipset',
    eraId: 'era-pre-atx',
    badge: 'Consolidación de Silicio',
    formFactor: 'Baby AT (216 × 330 mm)',
    architecturalLeap: 'Sustitución de decenas de chips discretos por un "Chipset" de pocos circuitos integrados.',
    busAndInterconnect: 'ISA de 16 bits + primeros buses EISA de 32 bits a 8.33 MHz',
    memoryType: 'Módulos SIMM de 30 pines (FPM RAM)',
    powerSpecs: 'Conectores AT P8/P9 con interruptor mecánico directo de 110V/220V',
    representativeBoard: 'Placas 386 con Chipset Chips and Technologies NEAT',
    details: 'El factor de forma Baby AT redujo el ancho a 216 mm. La firma Chips and Technologies inventó el concepto de "Chipset" (conjunto de chips) con el NEAT, reemplazando casi 100 chips lógicos por solo 4 circuitos LSI.',
    keyTechnicalImpact: [
      'Reducción drástica del costo de fabricación de placas base en Asia.',
      'Aparición de zócalos de inserción rápida para microprocesadores 386.',
      'Estandarización de módulos SIMM de 30 pines con bus de 8 bits (requiriendo 4 módulos para completar los 32 bits del 386).'
    ],
    comparisonMetric: {
      busSpeed: '8.33 MB/s (ISA) / 33 MB/s (EISA)',
      ramBandwidth: '0.05 GB/s',
      maxPower: '200W PSU',
      storageSpeed: 'IDE ATA-1 (~4 MB/s)'
    }
  },
  {
    id: 'm-1992',
    year: 1992,
    title: 'VESA Local Bus (VLB): La Carrera Gráfica',
    eraId: 'era-pre-atx',
    badge: 'Salto Gráfico',
    formFactor: 'Baby AT',
    architecturalLeap: 'Primer enlace de video sincronizado directamente a la frecuencia del microprocesador 486.',
    busAndInterconnect: 'VESA Local Bus (32-bit a 33-50 MHz, hasta 133 MB/s)',
    memoryType: 'SIMM de 72 pines (EDO y FPM RAM)',
    powerSpecs: 'Conectores AT P8/P9',
    representativeBoard: 'ASUS ISA-486SV2 / FIC 486-VIP',
    details: 'Con la llegada de Windows 3.1 y los gráficos SVGA, el bus ISA de 8 MB/s se convirtió en un embudo inaceptable. VESA ideó una extensión de ranura de 112 pines alineada detrás del conector ISA que operaba a la velocidad del reloj del 486.',
    keyTechnicalImpact: [
      'Aceleración de 16 veces en el renderizado de interfaces gráficas.',
      'Inestabilidad eléctrica severa si se instalaban más de dos tarjetas VLB por problemas de capacitancia.',
      'Demostró la necesidad urgente de un bus maestro independiente del procesador: el futuro PCI.'
    ],
    comparisonMetric: {
      busSpeed: '133 MB/s (VLB 33 MHz)',
      ramBandwidth: '0.10 GB/s',
      maxPower: '200W',
      storageSpeed: 'IDE ATA-2 (~8.3 MB/s)'
    }
  },
  {
    id: 'm-1995',
    year: 1995,
    title: 'La Gran Revolución ATX: Nace la Placa Moderna',
    eraId: 'era-atx-clasica',
    badge: 'Cambio de Paradigma',
    formFactor: 'ATX 1.0 (305 × 244 mm)',
    architecturalLeap: 'Rotación de componentes 90°, panel trasero de puertos integrado y Soft-Off ACPI.',
    busAndInterconnect: 'Bus PCI de 32 bits a 33 MHz (133 MB/s)',
    memoryType: 'DIMM de 168 pines SDRAM (PC66) y SIMM 72 pines',
    powerSpecs: 'Conector único ATX de 20 pines con líneas dedicadas de +3.3V, +5V, +12V y señal PS_ON',
    representativeBoard: 'Intel Advanced/AS (Atlantis) / ASUS TX97',
    details: 'Intel publicó la especificación ATX en 1995 para resolver los defectos del Baby AT: rotó el procesador para que el flujo de aire de la fuente lo refrigerara, integró un panel trasero con teclado PS/2, ratón y puertos serie/paralelo sin cables sueltos, e introdujo el apagado por software (Soft-Off).',
    keyTechnicalImpact: [
      'Eliminó el peligro de los conectores P8/P9 y los cables de alto voltaje mecánicos en el frontal.',
      'Estableció el escudo de E/S trasero (I/O Shield) que usamos hasta el día de hoy.',
      'Soporte nativo para modos de suspensión y administración de energía ACPI.'
    ],
    comparisonMetric: {
      busSpeed: '133 MB/s (PCI 33 MHz)',
      ramBandwidth: '0.53 GB/s (PC66)',
      maxPower: '250W (Conector ATX 20-pin)',
      storageSpeed: 'Ultra ATA/33 (33 MB/s)'
    }
  },
  {
    id: 'm-1997',
    year: 1997,
    title: 'El Bus AGP y el Pináculo del Socket 7 Universal',
    eraId: 'era-atx-clasica',
    badge: 'Arquitectura 3D',
    formFactor: 'ATX / Baby AT',
    architecturalLeap: 'Bus AGP exclusivo punto a punto para gráficos 3D y memorias SDRAM PC100.',
    busAndInterconnect: 'AGP 1X / 2X (66 MHz, hasta 533 MB/s) + PCI',
    memoryType: 'DIMM SDRAM de 168 pines (PC66/PC100)',
    powerSpecs: 'ATX 20 pines',
    representativeBoard: 'ASUS TX97-E / FIC PA-2013 (Super Socket 7)',
    details: 'Los aceleradores 3D como 3dfx Voodoo y Nvidia RIVA 128 saturaban el bus PCI compartido. Intel creó el bus AGP (Accelerated Graphics Port) conectado directamente al Northbridge con acceso directo a la memoria del sistema (DIME).',
    keyTechnicalImpact: [
      'Última plataforma donde procesadores de Intel, AMD (K6) y Cyrix compartieron el mismo zócalo físico.',
      'El bus AGP operaba a 66 MHz con multiplicadores 2X para acelerar texturas 3D complejas.',
      'Los módulos SDRAM DIMM sustituyen definitivamente a las memorias SIMM.'
    ],
    comparisonMetric: {
      busSpeed: '533 MB/s (AGP 2X)',
      ramBandwidth: '0.80 GB/s (PC100)',
      maxPower: '250W',
      storageSpeed: 'Ultra ATA/33 (33.3 MB/s)'
    }
  },
  {
    id: 'm-2001',
    year: 2001,
    title: 'Nacimiento del Factor de Forma Mini-ITX (VIA Technologies)',
    eraId: 'era-atx-clasica',
    badge: 'Miniaturización Extrema',
    formFactor: 'Mini-ITX (170 × 170 mm)',
    architecturalLeap: 'Toda la plataforma informática concentrada en un cuadrado de 17 cm por lado.',
    busAndInterconnect: '1 ranura PCI de 32 bits',
    memoryType: '1 ranura DIMM SDRAM / DDR',
    powerSpecs: 'Conector ATX de 20 pines de bajo consumo (<60W)',
    representativeBoard: 'VIA EPIA Mini-ITX Motherboard',
    details: 'Desarrollado por VIA Technologies para procesadores Eden/C3 de bajísimo consumo. Demostró que un ordenador funcional con gráficos, audio, red y almacenamiento no requería una torre pesada, sentando las bases del movimiento Small Form Factor (SFF).',
    keyTechnicalImpact: [
      'Puntos de anclaje mecánicos 100% compatibles con chasis ATX estándar.',
      'Refrigeración pasiva silenciosa para centros multimedia (HTPC) y terminales punto de venta.',
      'Obligó a los fabricantes a dominar el ruteo de PCBs de alta densidad en áreas diminutas.'
    ],
    comparisonMetric: {
      busSpeed: '133 MB/s (PCI)',
      ramBandwidth: '1.06 GB/s',
      maxPower: '60W',
      storageSpeed: 'Ultra ATA/100 (100 MB/s)'
    }
  },
  {
    id: 'm-2003',
    year: 2003,
    title: 'Dual-Channel DDR, SATA y el Mito de nForce2',
    eraId: 'era-atx-clasica',
    badge: 'Overclocking & Doble Canal',
    formFactor: 'ATX Estándar',
    architecturalLeap: 'Arquitectura de memoria de doble canal (128 bits) y primeros puertos Serial ATA serie.',
    busAndInterconnect: 'AGP 8X (2.13 GB/s) + Bus PCI',
    memoryType: 'DDR-400 (PC3200) en configuración Dual-Channel (6.4 GB/s)',
    powerSpecs: 'ATX de 20 pines + conector auxiliar cuadrado P4 (+12V)',
    representativeBoard: 'Abit NF7-S v2.0 / ASUS A7N8X Deluxe',
    details: 'Nvidia irrumpió en los chipsets con el nForce2 Ultra 400 para procesadores Athlon XP. Duplicó el ancho de banda con dos canales de memoria independientes de 64 bits y ofreció el procesador de sonido SoundStorm con codificación Dolby Digital en tiempo real.',
    keyTechnicalImpact: [
      'Nacimiento de los puertos SATA I (1.5 Gbps) que reemplazaron los molestos cables planos IDE.',
      'Adopción obligatoria del conector cuadrado P4 de 12V para alimentar los VRMs del CPU.',
      'Saturación total del bus AGP 8X, allanando el camino para la revolución PCI Express.'
    ],
    comparisonMetric: {
      busSpeed: '2,133 MB/s (AGP 8X)',
      ramBandwidth: '6.40 GB/s (Dual DDR-400)',
      maxPower: '350W PSU',
      storageSpeed: 'SATA I (150 MB/s)'
    }
  },
  {
    id: 'm-2004',
    year: 2004,
    title: 'La Gran Ruptura: Despliegue de PCI Express y el Fallido BTX',
    eraId: 'era-pcie-uefi',
    badge: 'Arquitectura Serie',
    formFactor: 'Transición ATX a BTX (Balanced Technology Extended)',
    architecturalLeap: 'Reemplazo de buses paralelos por enlaces serie punto a punto PCI Express.',
    busAndInterconnect: 'PCI Express 1.0a (x16 a 4.0 GB/s, x1 a 250 MB/s)',
    memoryType: 'DDR2-533 / DDR2-667',
    powerSpecs: 'Nuevo conector ATX de 24 pines (soporte de 75W por ranura PCIe)',
    representativeBoard: 'Intel D915PBL / DFI LANParty UT NF4 SLI',
    details: 'Intel intentó imponer el formato BTX para disipar los más de 130W del abrasador Pentium 4 Prescott. La industria rechazó masivamente BTX por incompatibilidad con gabinetes ATX existentes. Al mismo tiempo, PCI Express 1.0a debutó liquidando en un solo movimiento a los buses AGP y PCI tradicional.',
    keyTechnicalImpact: [
      'Ampliación del conector principal de 20 a 24 pines para alimentar los 75W de las ranuras PCIe.',
      'Topología serie diferencial con escalabilidad de carriles (x1, x4, x8, x16).',
      'El fracaso de BTX consolidó a ATX como el formato más longevo de la historia de la informática.'
    ],
    comparisonMetric: {
      busSpeed: '4,000 MB/s (PCIe 1.0 x16)',
      ramBandwidth: '8.53 GB/s (Dual DDR2-533)',
      maxPower: '450W PSU',
      storageSpeed: 'SATA II (300 MB/s)'
    }
  },
  {
    id: 'm-2008',
    year: 2008,
    title: 'Muerte del Northbridge: IMC en el CPU y Enlaces QPI/DMI',
    eraId: 'era-pcie-uefi',
    badge: 'Fin del Northbridge',
    formFactor: 'ATX / E-ATX',
    architecturalLeap: 'El controlador de memoria y los carriles PCIe se integran dentro de la CPU.',
    busAndInterconnect: 'PCIe 2.0 (8.0 GB/s x16) + Enlace Intel QuickPath Interconnect (QPI)',
    memoryType: 'Triple-Channel DDR3-1333 / 1600 (LGA 1366)',
    powerSpecs: 'ATX 24 pines + EPS de 8 pines',
    representativeBoard: 'ASUS Rampage II Extreme (Intel X58) / Gigabyte EX58-EXTREME',
    details: 'Con la arquitectura Nehalem (Core i7) y el chipset X58, Intel siguió los pasos de AMD K8: eliminó el Front Side Bus y el Northbridge tradicional. El procesador asumió el control de memoria y gráficos, mientras un único chip concentrador (PCH o IOH) gestionaba la E/S.',
    keyTechnicalImpact: [
      'Latencia de memoria reducida a la mitad gracias a la conexión directa con el silicio del CPU.',
      'Soporte para memoria Triple-Channel y Quad-Channel en estaciones de trabajo.',
      'El chipset pasa a ser un dispositivo secundario de bajo consumo térmico.'
    ],
    comparisonMetric: {
      busSpeed: '8,000 MB/s (PCIe 2.0 x16)',
      ramBandwidth: '32.0 GB/s (Triple DDR3-1333)',
      maxPower: '600W PSU',
      storageSpeed: 'SATA II (300 MB/s)'
    }
  },
  {
    id: 'm-2011',
    year: 2011,
    title: 'La Revolución UEFI: Adiós a la BIOS de 16 Bits',
    eraId: 'era-pcie-uefi',
    badge: 'Firmware Moderno',
    formFactor: 'ATX Estándar',
    architecturalLeap: 'Firmware gráfico UEFI de 64 bits con mouse, tablas GPT >2TB y Secure Boot.',
    busAndInterconnect: 'PCIe 2.0 / primeros PCIe 3.0 (15.75 GB/s x16)',
    memoryType: 'Dual-Channel DDR3-1600 / 2133(OC)',
    powerSpecs: 'ATX 24 pines + EPS 8 pines',
    representativeBoard: 'ASUS SABERTOOTH P67 / Z77 Thermal Armor',
    details: 'Tras tres décadas arrancando en modo real de 16 bits, las placas base adoptaron el estándar UEFI de 64 bits. Permitía interfaces gráficas de alta resolución con ratón, soporte nativo de discos GPT superiores a 2 TB y el protocolo Secure Boot contra malware.',
    keyTechnicalImpact: [
      'Tiempos de POST reducidos a menos de 3 segundos.',
      'Control de curvas de ventilación PWM integrado en tiempo real.',
      'Aparición del blindaje térmico completo de plástico y metal (Thermal Armor).'
    ],
    comparisonMetric: {
      busSpeed: '15,754 MB/s (PCIe 3.0 x16)',
      ramBandwidth: '25.60 GB/s (Dual DDR3-1600)',
      maxPower: '650W PSU',
      storageSpeed: 'SATA III (600 MB/s)'
    }
  },
  {
    id: 'm-2015',
    year: 2015,
    title: 'Revolución del Almacenamiento: El Estándar M.2 NVMe',
    eraId: 'era-moderna',
    badge: 'Almacenamiento Directo',
    formFactor: 'ATX / MicroATX / Mini-ITX',
    architecturalLeap: 'SSDs conectados directamente a 4 carriles PCIe del procesador bajo el protocolo NVMe.',
    busAndInterconnect: 'PCIe 3.0 x16 (Gráficos) + PCIe 3.0 x4 (M.2 NVMe)',
    memoryType: 'DDR4-2133 a 3200 MT/s',
    powerSpecs: 'ATX 24 pines + EPS 8 pines',
    representativeBoard: 'ASUS ROG Maximus VIII Hero (Intel Z170)',
    details: 'Los discos de estado sólido alcanzaron el tope de velocidad de 550 MB/s del puerto SATA III. La ranura compacta M.2 NVMe utilizó 4 líneas PCIe directas a 32 Gbps, multiplicando la velocidad de lectura por seis (3.500 MB/s) sin necesidad de cables.',
    keyTechnicalImpact: [
      'Eliminación de cables de datos y de corriente para las unidades principales del sistema.',
      'Adopción de disipadores metálicos térmicos dedicados para SSD M.2 en la placa base.',
      'Soporte generalizado de iluminación digital direccionable ARGB de 5V.'
    ],
    comparisonMetric: {
      busSpeed: '15,754 MB/s (PCIe 3.0 x16)',
      ramBandwidth: '38.40 GB/s (Dual DDR4-2400)',
      maxPower: '750W PSU',
      storageSpeed: 'M.2 NVMe PCIe 3.0 (~3,500 MB/s)'
    }
  },
  {
    id: 'm-2017',
    year: 2017,
    title: 'El Renacimiento de AMD y la Longevidad del Zócalo AM4',
    eraId: 'era-moderna',
    badge: 'Arquitectura Zen',
    formFactor: 'ATX / MicroATX / Mini-ITX',
    architecturalLeap: 'Diseño modular con enlace Infinity Fabric y soporte para CPUs de hasta 16 núcleos en zócalo unificado.',
    busAndInterconnect: 'PCIe 3.0 / PCIe 4.0 (introducido en X570 en 2019)',
    memoryType: 'Dual-Channel DDR4-3200+',
    powerSpecs: 'ATX 24 pines + EPS 8+4 pines',
    representativeBoard: 'ASUS ROG Crosshair VI Hero / MSI B450 Tomahawk',
    details: 'AMD presentó su zócalo AM4 (1331 pines PGA) que albergó cinco generaciones de procesadores (de Ryzen 1000 a 5000) en la misma plataforma. En 2019, la placa AMD X570 fue la primera del mundo en estrenar PCI Express 4.0.',
    keyTechnicalImpact: [
      'La mayor longevidad de un zócalo de microprocesador en la historia reciente (2017 a 2022+).',
      'Estreno mundial de PCI Express 4.0 (16 GT/s por línea) en placas de consumo.',
      'Democratización de VRMs de alta capacidad para CPUs de 8 a 16 núcleos.'
    ],
    comparisonMetric: {
      busSpeed: '31,508 MB/s (PCIe 4.0 x16)',
      ramBandwidth: '51.20 GB/s (Dual DDR4-3200)',
      maxPower: '850W PSU',
      storageSpeed: 'M.2 NVMe PCIe 4.0 (~7,000 MB/s)'
    }
  },
  {
    id: 'm-2021',
    year: 2021,
    title: 'PCIe 5.0, DDR5 y VRMs de Grado Industrial',
    eraId: 'era-moderna',
    badge: 'Alta Frecuencia',
    formFactor: 'ATX / E-ATX',
    architecturalLeap: 'Señalización serie a 32 GT/s, DDR5 con PMIC y etapas DrMOS de más de 100A.',
    busAndInterconnect: 'PCIe 5.0 (63.0 GB/s x16) + Enlace DMI 4.0 x8 hacia PCH',
    memoryType: 'Dual-Channel DDR5-4800 a 6400+ MT/s con On-Die ECC',
    powerSpecs: 'ATX 24 pines + Dual 8 pines EPS de 12V con pines sólidos',
    representativeBoard: 'ASUS ROG Maximus Z690 Hero / MSI MEG X670E ACE',
    details: 'Con el zócalo LGA 1700 de Intel y AM5 de AMD, las placas dieron el salto a DDR5 y PCIe 5.0. Para alimentar procesadores con picos transitorios superiores a 300W, las placas de gama alta incorporaron VRMs de hasta 24 fases digitales con etapas SPS de 105A.',
    keyTechnicalImpact: [
      'Duplicación del ancho de banda de GPU y almacenamiento respecto a PCIe 4.0.',
      'Transferencia del chip regulador de voltaje PMIC al propio módulo DDR5.',
      'Adopción de PCBs de 8 a 10 capas con cobre reforzado de 2 onzas para integridad de señal.'
    ],
    comparisonMetric: {
      busSpeed: '63,016 MB/s (PCIe 5.0 x16)',
      ramBandwidth: '102.4 GB/s (Dual DDR5-6400)',
      maxPower: '1000W+ PSU (ATX 3.0)',
      storageSpeed: 'M.2 NVMe PCIe 5.0 (~14,500 MB/s)'
    }
  },
  {
    id: 'm-2024',
    year: 2024,
    title: 'La Era BTF / Project Zero: Conectores Ocultos y Cables Cero',
    eraId: 'era-moderna',
    badge: 'Revolución Estética y Térmica',
    formFactor: 'ATX BTF / DIY-APE / Project Zero',
    architecturalLeap: 'Reubicación de todos los conectores de alimentación en el reverso del PCB y ranura GPU de 600W sin cables.',
    busAndInterconnect: 'PCIe 5.0 x16 + Ranura de alimentación de gráficos BTF (GC-HPWR) + Thunderbolt 5 (hasta 120 Gbps)',
    memoryType: 'DDR5-8800+ MT/s (módulos CUDIMM con generador de reloj integrado)',
    powerSpecs: 'Conectores traseros: ATX 24-pin, dual EPS 8-pin, 12V-2x6 de alta corriente',
    representativeBoard: 'ASUS ROG Maximus Z890 Hero BTF / MSI Z790 Project Zero',
    details: 'Los estándares ASUS BTF (Back-To-Future) y MSI Project Zero rompen con 30 años de cables colgantes. Trasladan los puertos al reverso de la placa y añaden una ranura de alimentación de GPU integrada en el PCB que suministra hasta 600W a la tarjeta de video sin requerir el peligroso cable frontal de 12V-2x6.',
    keyTechnicalImpact: [
      'Flujo de aire interno totalmente despejado que reduce la temperatura ambiente del gabinete.',
      'Soporte nativo para Wi-Fi 7 (canales de 320 MHz) y puertos Thunderbolt 5 a 120 Gbps.',
      'Módulos CUDIMM con circuito integrado CKD (Clock Driver) para romper la barrera de los 9.000 MT/s.'
    ],
    comparisonMetric: {
      busSpeed: '63,016 MB/s (PCIe 5.0) / 126 GB/s (PCIe 6.0*)',
      ramBandwidth: '140.8 GB/s (Dual CUDIMM DDR5-8800)',
      maxPower: '1200W+ PSU (ATX 3.1 con 12V-2x6)',
      storageSpeed: 'M.2 NVMe PCIe 5.0 x4 (14,500+ MB/s)'
    }
  }
];

// Fuentes y referencias bibliográficas documentadas
export const SOURCES_AND_REFERENCES = [
  {
    title: 'PCI-SIG PCI Express Base Specification Revisions 1.0a through 6.0',
    organization: 'PCI Special Interest Group (PCI-SIG)',
    year: '2004 - 2024',
    scope: 'Especificaciones canónicas de señalización física, tasas de transferencia (GT/s), codificación de línea (8b/10b, 128b/130b, PAM4) y requerimientos de canal.',
    url: 'https://pcisig.com/specifications'
  },
  {
    title: 'JEDEC Standard DDR to DDR5 SDRAM Specification (JESD79 series)',
    organization: 'JEDEC Solid State Technology Association',
    year: '2000 - 2024',
    scope: 'Parámetros eléctricos de memoria volátil, voltajes VDD/VDDQ, topologías de bus y especificaciones de temporización.',
    url: 'https://www.jedec.org'
  },
  {
    title: 'Intel ATX Specification Version 2.2 & ATX12V Power Supply Design Guide',
    organization: 'Intel Corporation',
    year: '1995 - 2024',
    scope: 'Definición mecánica del factor de forma ATX, rotación de flujo de aire de 90 grados, asignación de pines de conectores de 20 y 24 pines y especificaciones térmicas.',
    url: 'https://www.intel.com'
  },
  {
    title: 'AMD AM4 / AM5 Platform Architecture Whitepaper & Developer Guides',
    organization: 'Advanced Micro Devices (AMD)',
    year: '2017 - 2024',
    scope: 'Topología de enlace Infinity Fabric, distribución de carriles PCIe directos de CPU vs. chipset Promontory y gestión de energía SoC.',
    url: 'https://developer.amd.com'
  },
  {
    title: 'AnandTech & Tom\'s Hardware Motherboard Architecture Archives (1997-2024)',
    organization: 'Publicaciones de Arquitectura de Hardware de Computador',
    year: '1997 - 2024',
    scope: 'Análisis de laboratorio de circuitos VRM, pruebas de integridad de señal, retrospectivas de chipsets y mediciones osciloscópicas de rizado de voltaje.',
    url: 'https://www.anandtech.com / https://www.tomshardware.com'
  }
];
