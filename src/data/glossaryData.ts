/**
 * Glosario Técnico Exhaustivo de Placas Base y Arquitectura de Computadores
 */

export interface GlossaryItem {
  id: string;
  term: string;
  acronym?: string;
  category: 'energia' | 'buses' | 'memoria' | 'firmware' | 'arquitectura' | 'almacenamiento';
  shortDefinition: string;
  fullDefinition: string;
  hardwareRelevance: string;
  relatedTerms: string[];
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'vrm',
    term: 'VRM',
    acronym: 'Voltage Regulator Module',
    category: 'energia',
    shortDefinition: 'Circuito que convierte los +12V de la fuente de poder en los ~0.8V a 1.4V que necesita el CPU.',
    fullDefinition: 'El Módulo Regulador de Voltaje (VRM) es una fuente conmutada síncrona multifase situada alrededor del zócalo del procesador. Convierte los 12 voltios de corriente continua procedentes de la fuente de alimentación en tensiones milivoltio-precisas (VCore), entregando corrientes que pueden superar los 300A con rizado inferior a 10mV.',
    hardwareRelevance: 'Un VRM con etapas de calidad (DrMOS/SPS) y disipadores de aluminio con aletas gruesas evita que la CPU reduzca su frecuencia por sobrecalentamiento térmico (thermal throttling).',
    relatedTerms: ['drmos', 'choke', 'pwm']
  },
  {
    id: 'drmos',
    term: 'DrMOS / SPS',
    acronym: 'Driver + MOSFET / Smart Power Stage',
    category: 'energia',
    shortDefinition: 'Circuito integrado que unifica el controlador de compuerta y los dos transistores de potencia en un solo silicio.',
    fullDefinition: 'Sustituye el diseño antiguo de MOSFETs discretos (High-Side y Low-Side separados). Al integrar el driver y los transistores en un único chip optimizado térmicamente, minimiza la inductancia parásita de las pistas y soporta corrientes continuas de 60A a 105A por fase con eficiencias superiores al 93%.',
    hardwareRelevance: 'Las placas base de alta gama montan arreglos de 16 a 24 etapas DrMOS para alimentar procesadores multinúcleo en cargas intensas de renderizado o cálculo.',
    relatedTerms: ['vrm', 'pwm']
  },
  {
    id: 'chipset',
    term: 'Chipset (PCH)',
    acronym: 'Platform Controller Hub',
    category: 'arquitectura',
    shortDefinition: 'Centro neurálgico secundario que multiplexa el tráfico de discos, puertos USB, red y audio hacia el CPU.',
    fullDefinition: 'En placas modernas, el Chipset es un concentrador (PCH en Intel, Promontory en AMD) enlazado a la CPU a través de un bus serie de alta velocidad (DMI o PCIe Uplink). Administra los puertos SATA, controladores de red Ethernet/Wi-Fi, códec de audio y ranuras PCIe secundarias.',
    hardwareRelevance: 'Determina cuántos puertos USB de alta velocidad, ranuras M.2 y líneas de expansión puede ofrecer la placa base, así como la capacidad de overclocking.',
    relatedTerms: ['dmi', 'fsb', 'northbridge']
  },
  {
    id: 'imc',
    term: 'IMC',
    acronym: 'Integrated Memory Controller',
    category: 'memoria',
    shortDefinition: 'Controlador de memoria integrado directamente en el silicio del procesador.',
    fullDefinition: 'Circuito lógico dentro del chip del CPU responsable de coordinar la lectura y escritura con los módulos DRAM. Al estar dentro del silicio del procesador en lugar de en la placa base (como ocurría en la era del Northbridge), redujo la latencia de acceso a memoria de más de 120ns a menos de 50-60ns.',
    hardwareRelevance: 'El IMC define la velocidad máxima de memoria DDR4 o DDR5 soportada, así como la estabilidad de los perfiles de overclocking XMP o EXPO.',
    relatedTerms: ['xmp', 'daisy-chain', 'pmic']
  },
  {
    id: 'pcie',
    term: 'PCI Express (PCIe)',
    acronym: 'Peripheral Component Interconnect Express',
    category: 'buses',
    shortDefinition: 'Estándar serie punto a punto de interconexión para tarjetas gráficas y discos SSD NVMe.',
    fullDefinition: 'Bus serie de señalización diferencial que sustituyó a los buses paralelos PCI y AGP en 2004. Escala en número de carriles físicos (x1, x4, x8, x16) y duplica su ancho de banda en cada generación: PCIe 3.0 (8 GT/s), PCIe 4.0 (16 GT/s), PCIe 5.0 (32 GT/s) y PCIe 6.0 (64 GT/s con modulación PAM4).',
    hardwareRelevance: 'La ranura principal PCIe x16 conecta directamente con los pines del zócalo del CPU sin pasar por el chipset, garantizando latencia mínima para la GPU.',
    relatedTerms: ['m2', 'pam4', 'dmi']
  },
  {
    id: 'm2',
    term: 'Ranura M.2 (NVMe)',
    acronym: 'Next Generation Form Factor (NGFF)',
    category: 'almacenamiento',
    shortDefinition: 'Factor de forma ultracompacto para unidades SSD conectadas directamente al bus PCIe.',
    fullDefinition: 'Conector de borde de 75 pines que aloja discos de estado sólido con clave M-Key. Emplea 4 carriles PCIe dedicados bajo el protocolo NVMe (Non-Volatile Memory Express), alcanzando tasas de lectura de hasta 7.500 MB/s en PCIe 4.0 y más de 14.500 MB/s en PCIe 5.0.',
    hardwareRelevance: 'Elimina los cables de datos y corriente SATA dentro del gabinete. Requiere disipadores de aluminio integrados en la placa base para evitar estrangulamiento térmico.',
    relatedTerms: ['pcie', 'sata']
  },
  {
    id: 'uefi',
    term: 'UEFI',
    acronym: 'Unified Extensible Firmware Interface',
    category: 'firmware',
    shortDefinition: 'Firmware gráfico modular de 64 bits que sustituyó a la clásica BIOS de 16 bits.',
    fullDefinition: 'Entorno de software embebido en el chip flash de la placa base que ejecuta el POST (autocomprobación de encendido), entrena la memoria RAM, carga el microcódigo de la CPU y cede el control al sistema operativo. Soporta discos con particiones GPT superiores a 2 TB, arranque seguro (Secure Boot) y control por ratón.',
    hardwareRelevance: 'Permite configurar perfiles de ventiladores, curvas de voltaje, overclocking XMP/EXPO y actualizar la placa mediante BIOS Flashback sin CPU instalada.',
    relatedTerms: ['post', 'cmos', 'flashback']
  },
  {
    id: 'btf',
    term: 'ASUS BTF / Project Zero',
    acronym: 'Back-To-Future / DIY-APE',
    category: 'arquitectura',
    shortDefinition: 'Estándar moderno que reubica todos los cables de alimentación en el reverso del PCB.',
    fullDefinition: 'Revolución en el factor de forma ATX que traslada el conector de 24 pines, los cables EPS de la CPU, conectores de ventiladores y cabezales USB a la cara posterior de la placa base. Introduce una ranura de alimentación de gráficos dedicada (GC-HPWR) que suministra hasta 600W a la GPU sin cables expuestos.',
    hardwareRelevance: 'Deja el compartimento frontal del chasis completamente limpio de cables, mejorando la convección térmica y la estética visual de ensamble.',
    relatedTerms: ['atx', 'pcie']
  },
  {
    id: 'daisy-chain',
    term: 'Daisy-Chain',
    category: 'memoria',
    shortDefinition: 'Topología de ruteo de pistas de memoria donde la señal conecta primero a la ranura 2 y luego a la 1.',
    fullDefinition: 'Diseño circuital donde las pistas de cobre de cada canal de memoria viajan desde la CPU hasta el segundo zócalo DIMM y de allí continúan al primero. Es la topología dominante en placas modernas porque maximiza la integridad de señal y las frecuencias récord cuando se usan solo 2 módulos de RAM.',
    hardwareRelevance: 'Explica por qué los manuales de placas base siempre instruyen instalar primero los módulos de memoria en las ranuras 2 y 4 (A2 y B2).',
    relatedTerms: ['t-topology', 'imc', 'crosstalk']
  },
  {
    id: 't-topology',
    term: 'T-Topology',
    category: 'memoria',
    shortDefinition: 'Topología simétrica en forma de T para ruteo de memoria RAM.',
    fullDefinition: 'Técnica de trazado de PCB donde la pista que sale del procesador se divide en una bifurcación equidistante hacia ambas ranuras DIMM. Garantiza una longitud de traza matemáticamente idéntica hacia los dos módulos de un canal.',
    hardwareRelevance: 'Favorece la estabilidad cuando se instalan 4 módulos de memoria simultáneamente, aunque penaliza la frecuencia máxima obtenible con solo 2 módulos.',
    relatedTerms: ['daisy-chain', 'imc']
  },
  {
    id: 'pmic',
    term: 'PMIC',
    acronym: 'Power Management Integrated Circuit',
    category: 'memoria',
    shortDefinition: 'Chip de gestión de energía integrado directamente en cada módulo de memoria DDR5.',
    fullDefinition: 'A partir de DDR5, la placa base ya no se encarga de regular la tensión de la memoria RAM. La placa entrega 5V y un chip PMIC situado en el propio circuito impreso del módulo DDR5 regula localmente los 1.1V (VDD/VDDQ) con mayor estabilidad y menor ruido eléctrico.',
    hardwareRelevance: 'Descarga de calor y circuitería al PCB de la placa base, permitiendo perfiles de overclocking dinámicos más estables.',
    relatedTerms: ['vrm', 'imc']
  },
  {
    id: 'on-die-ecc',
    term: 'On-Die ECC',
    acronym: 'On-Die Error Correction Code',
    category: 'memoria',
    shortDefinition: 'Algoritmo de corrección de errores dentro del propio chip de memoria DDR5.',
    fullDefinition: 'Mecanismo interno de comprobación y corrección de bits implementado dentro de las matrices de silicio de la memoria DDR5. Diseñado para tolerar las diminutas densidades de celda y evitar que fugas eléctricas microscópicas corrompan datos.',
    hardwareRelevance: 'Difiere del ECC tradicional de servidor (que protege también el bus entre la RAM y la CPU), pero garantiza una fiabilidad sin precedentes en memoria de consumo.',
    relatedTerms: ['pmic', 'imc']
  },
  {
    id: 'dmi',
    term: 'DMI',
    acronym: 'Direct Media Interface',
    category: 'buses',
    shortDefinition: 'Enlace serie punto a punto propietario de Intel que comunica el CPU con el Chipset PCH.',
    fullDefinition: 'Bus de interconexión punto a punto que actúa como puente de datos entre la CPU y el concentrador PCH. DMI 4.0 opera sobre 8 carriles basados en señalización PCIe 4.0, entregando hasta 15.75 GB/s en cada sentido.',
    hardwareRelevance: 'Todo el tráfico de periféricos secundarios (SATA, Wi-Fi, Ethernet, USB y ranuras PCIe del chipset) debe compartir el ancho de banda del enlace DMI.',
    relatedTerms: ['chipset', 'pcie', 'fsb']
  },
  {
    id: 'pam4',
    term: 'PAM4',
    acronym: 'Pulse Amplitude Modulation 4-Level',
    category: 'buses',
    shortDefinition: 'Esquema de modulación que transmite 2 bits por ciclo de reloj usando 4 niveles de voltaje.',
    fullDefinition: 'Técnica de señalización de alta velocidad adoptada en la norma PCIe 6.0. En lugar de transmitir 1 bit por ciclo (0 o 1) mediante codificación binaria NRZ, PAM4 utiliza cuatro amplitudes de voltaje distintas para codificar combinaciones de 2 bits (00, 01, 10, 11), duplicando el ancho de banda a la misma frecuencia de reloj.',
    hardwareRelevance: 'Obliga a los diseñadores de placas base a emplear sustratos de PCB de ultra baja pérdida dieléctrica (Low-Dk) para mitigar el ruido entre niveles.',
    relatedTerms: ['pcie']
  },
  {
    id: 'fsb',
    term: 'FSB (Front Side Bus)',
    category: 'arquitectura',
    shortDefinition: 'Bus paralelo histórico que enlazaba el microprocesador con el Northbridge (1990-2008).',
    fullDefinition: 'Canal de comunicación primario de la placa base en las eras Pre-ATX y ATX clásica. Todo el tráfico hacia la memoria RAM y la tarjeta gráfica AGP debía circular obligatoriamente por el FSB, convirtiéndose en el mayor cuello de botella del sistema hasta su reemplazo por enlaces QPI, HyperTransport y DMI.',
    hardwareRelevance: 'Hito histórico fundamental de la informática que fue eliminado cuando el controlador de memoria se integró en la CPU.',
    relatedTerms: ['northbridge', 'dmi', 'chipset']
  },
  {
    id: 'northbridge',
    term: 'Puente Norte (Northbridge)',
    category: 'arquitectura',
    shortDefinition: 'Circuito integrado histórico que controlaba la memoria y los gráficos de alta velocidad.',
    fullDefinition: 'Uno de los dos chips que conformaban el chipset clásico. Se ubicaba junto al zócalo del CPU y gestionaba el bus de memoria RAM y la ranura AGP o PCIe primaria. Se comunicaba con el procesador a través del FSB y con el Southbridge mediante el bus PCI.',
    hardwareRelevance: 'Desapareció físicamente de las placas base cuando sus funciones críticas fueron absorbidas por el propio silicio del procesador.',
    relatedTerms: ['fsb', 'chipset']
  },
  {
    id: 'post',
    term: 'POST (Power-On Self-Test)',
    category: 'firmware',
    shortDefinition: 'Rutina de diagnóstico automática ejecutada por la BIOS/UEFI al encender el computador.',
    fullDefinition: 'Proceso de arranque de bajo nivel en el que la placa base verifica e inicializa secuencialmente los cuatro componentes críticos: procesador (CPU), memoria de trabajo (DRAM), tarjeta gráfica (VGA) y dispositivo de arranque (BOOT).',
    hardwareRelevance: 'Las placas base incorporan 4 luces LED (Q-LED) o una pantalla de dos dígitos con códigos hexadecimales de depuración para identificar qué componente detuvo el POST.',
    relatedTerms: ['uefi', 'cmos']
  },
  {
    id: 'flashback',
    term: 'BIOS Flashback',
    category: 'firmware',
    shortDefinition: 'Tecnología que permite actualizar el firmware de la placa base sin CPU, RAM ni tarjeta gráfica instaladas.',
    fullDefinition: 'Circuito autónomo con un microcontrolador dedicado y un botón en el panel trasero de E/S. Permite flashear un nuevo archivo de BIOS desde una memoria USB con solo conectar la fuente de poder de 24 pines a la placa.',
    hardwareRelevance: 'Resuelve el problema clásico de comprar una placa base incompatible de fábrica con un procesador recién salido al mercado.',
    relatedTerms: ['uefi', 'post']
  },
  {
    id: 'crosstalk',
    term: 'Crosstalk (Diafonía)',
    category: 'arquitectura',
    shortDefinition: 'Interferencia electromagnética inducida entre pistas conductoras paralelas en el PCB.',
    fullDefinition: 'Fenómeno electromagnético donde la señal pulsante de alta frecuencia de una pista del circuito impreso genera un campo inductivo o capacitivo no deseado sobre una pista contigua, corrompiendo los datos.',
    hardwareRelevance: 'Se combate en placas de 8 a 12 capas intercalando planos sólidos de tierra (GND) entre las capas de señales y manteniendo separaciones mínimas (regla 3W).',
    relatedTerms: ['daisy-chain']
  },
  {
    id: 'cmos',
    term: 'Memoria CMOS / Batería RTC',
    category: 'firmware',
    shortDefinition: 'Memoria volátil de bajo consumo que guarda la hora y ajustes de BIOS mediante una pila de litio.',
    fullDefinition: 'Circuito de memoria estática SRAM que retiene los parámetros de configuración del sistema (orden de booteo, perfiles de overclocking, hora del sistema). Es alimentada permanentemente por una pila botón de litio CR2032 de 3V cuando el PC está desconectado de la red eléctrica.',
    hardwareRelevance: 'Al agotarse tras varios años, la placa base pierde la fecha y muestra el clásico error "CMOS Checksum Error" al encender.',
    relatedTerms: ['uefi', 'post']
  },
  {
    id: 'sata',
    term: 'SATA (Serial ATA)',
    acronym: 'Serial Advanced Technology Attachment',
    category: 'almacenamiento',
    shortDefinition: 'Interfaz de transferencia serie para discos duros mecánicos y SSDs de 2.5 pulgadas.',
    fullDefinition: 'Estándar introducido en 2003 que sustituyó a las voluminosas cintas PATA/IDE de 40/80 hilos por un cable fino de 7 pines. La revisión SATA III (6 Gb/s) ofrece un límite teórico de 600 MB/s (~550 MB/s reales bajo protocolo AHCI).',
    hardwareRelevance: 'Aunque ha sido superado en velocidad por las ranuras M.2 NVMe, las placas base modernas continúan incluyendo de 4 a 6 puertos SATA para almacenamiento masivo secundario.',
    relatedTerms: ['m2', 'ahci', 'pcie']
  },
  {
    id: 'atx',
    term: 'Factor de Forma ATX',
    acronym: 'Advanced Technology eXtended',
    category: 'arquitectura',
    shortDefinition: 'Estándar industrial de dimensiones y diseño electromecánico creado por Intel en 1995.',
    fullDefinition: 'Especificación estándar (305 × 244 mm) que revolucionó las placas base al integrar puertos de E/S directamente en el panel trasero (reemplazando los cables planos de AT), estandarizar el conector de alimentación de 20/24 pines con control de encendido por software (Soft Power) y orientar el flujo térmico del ventilador de la fuente hacia la CPU.',
    hardwareRelevance: 'Sigue siendo la norma reina de la industria del PC tras tres décadas, sirviendo de base a variantes como Micro-ATX (mATX) y Mini-ITX.',
    relatedTerms: ['btf', 'vrm']
  },
  {
    id: 'socket',
    term: 'Zócalo / Socket de CPU',
    category: 'arquitectura',
    shortDefinition: 'Receptáculo electromecánico que aloja el procesador y lo conecta a miles de pistas del PCB.',
    fullDefinition: 'Conector de alta precisión que establece contacto eléctrico entre los pines o pads del microprocesador y el circuito impreso de la placa base sin necesidad de soldadura. En plataformas modernas contiene entre 1.700 y 4.000 puntos de contacto para líneas de alimentación, canales DRAM y carriles PCIe.',
    hardwareRelevance: 'Determina estrictamente qué familias y generaciones de procesadores pueden instalarse físicamente en la placa base.',
    relatedTerms: ['lga', 'pga', 'vrm']
  },
  {
    id: 'lga',
    term: 'LGA (Land Grid Array)',
    acronym: 'Land Grid Array',
    category: 'arquitectura',
    shortDefinition: 'Empaquetado donde los pines elásticos están en el zócalo de la placa y la CPU tiene contactos planos.',
    fullDefinition: 'Topología electromecánica adoptada por Intel desde LGA 775 (2004) y por AMD desde el socket AM5 (2022). Traslada los frágiles pines de cobre berilio al zócalo de la placa base, dejando en la cara inferior del procesador una matriz de contactos planos dorados.',
    hardwareRelevance: 'Permite densidades de contacto mucho mayores necesarias para buses PCIe 5.0 y DDR5, pero requiere máxima precaución al manipular la placa para no doblar ningún pin del zócalo.',
    relatedTerms: ['socket', 'pga']
  },
  {
    id: 'pga',
    term: 'PGA (Pin Grid Array)',
    acronym: 'Pin Grid Array',
    category: 'arquitectura',
    shortDefinition: 'Diseño clásico donde los pines metálicos sobresalen del procesador y entran en orificios del zócalo.',
    fullDefinition: 'Sistema de inserción de fuerza cero (ZIF - Zero Insertion Force) mediante una palanca lateral. Los pines están soldados a la CPU y se deslizan dentro de los orificios del zócalo.',
    hardwareRelevance: 'Utilizado durante décadas en procesadores como Pentium, Athlon y los sockets AMD AM2, AM3 y AM4 hasta la transición a LGA en AM5.',
    relatedTerms: ['socket', 'lga']
  },
  {
    id: 'tdp',
    term: 'TDP / Potencia de Diseño Térmico',
    acronym: 'Thermal Design Power',
    category: 'energia',
    shortDefinition: 'Cantidad máxima de calor que el sistema de refrigeración de la placa y CPU debe disipar.',
    fullDefinition: 'Métrica en vatios (W) que define el consumo térmico sostenido bajo carga. En placas base modernas se traduce en límites de entrega de potencia como PL1/PL2 (Intel) o PPT/EDC/TDC (AMD Precision Boost Overdrive).',
    hardwareRelevance: 'Una placa base con disipadores de VRM deficientes no podrá sostener el TDP máximo de la CPU sin experimentar sobrecalentamiento.',
    relatedTerms: ['vrm', 'drmos']
  },
  {
    id: 'agp',
    term: 'AGP (Accelerated Graphics Port)',
    acronym: 'Accelerated Graphics Port',
    category: 'buses',
    shortDefinition: 'Puerto de gráficos dedicado de 32 bits derivado de PCI creado por Intel en 1997.',
    fullDefinition: 'Bus paralelo punto a punto diseñado exclusivamente para tarjetas gráficas 3D. Operaba a 66 MHz con multiplicadores 1x, 2x, 4x y 8x (hasta 2.1 GB/s) con acceso directo a la memoria del sistema (DIME). Fue sustituido por completo por PCIe x16 en 2004.',
    hardwareRelevance: 'Fue el primer puerto que independizó a la tarjeta de video del saturado bus PCI compartido.',
    relatedTerms: ['pcie', 'fsb']
  },
  {
    id: 'isa',
    term: 'Bus ISA',
    acronym: 'Industry Standard Architecture',
    category: 'buses',
    shortDefinition: 'El primer bus de expansión estándar para PC, introducido por IBM en 1981.',
    fullDefinition: 'Ranura de expansión paralela de 8 bits (4.77 MHz) y posteriormente 16 bits (8.33 MHz) en el IBM PC/AT. Ofrecía un ancho de banda máximo de tan solo ~8.3 MB/s con asignación manual de interrupciones (IRQ) y canales DMA mediante jumpers.',
    hardwareRelevance: 'Pilar histórico de la informática personal durante las décadas de 1980 y 1990 hasta su reemplazo por el bus PCI.',
    relatedTerms: ['pcie', 'atx']
  },
  {
    id: 'southbridge',
    term: 'Puente Sur (Southbridge / ICH)',
    acronym: 'I/O Controller Hub',
    category: 'arquitectura',
    shortDefinition: 'Chip secundario que controlaba interfaces lentas de E/S: audio, USB, discos y ranuras PCI.',
    fullDefinition: 'En la arquitectura clásica de dos chips, el Southbridge gestionaba los buses más lentos mientras el Northbridge se encargaba de memoria y gráficos. Conectado al Northbridge mediante el bus PCI o enlaces propietarios (como Intel Hub Link o VIA V-Link).',
    hardwareRelevance: 'Evolucionó conceptualmente hacia el moderno PCH (Platform Controller Hub) al absorberse el Northbridge en la CPU.',
    relatedTerms: ['northbridge', 'chipset', 'fsb']
  },
  {
    id: 'cam2',
    term: 'CAMM2',
    acronym: 'Compression Attached Memory Module 2',
    category: 'memoria',
    shortDefinition: 'Nuevo estándar JEDEC de módulos de memoria ultracompactos atornillados al PCB.',
    fullDefinition: 'Estándar que reemplaza las ranuras DIMM verticales por un módulo plano sujeto mediante tornillos a una cuadrícula de compresión LGA en el PCB. Al eliminar los pines largos de los zócalos DIMM tradicionales, acorta drásticamente las trazas de cobre y reduce la impedancia parásita.',
    hardwareRelevance: 'Permite alcanzar velocidades DDR5 superiores a 8.500 MT/s y soporte LPDDR5X en placas base de sobremesa con menor latencia.',
    relatedTerms: ['daisy-chain', 'pmic', 'imc']
  },
  {
    id: 'q-code',
    term: 'Display Q-Code / Debug LED',
    category: 'firmware',
    shortDefinition: 'Pantalla digital de dos dígitos hexadecimales en la placa que reporta estados del POST.',
    fullDefinition: 'Indicador numérico de siete segmentos conectado al bus LPC o eSPI que muestra códigos de estado durante el arranque (POST). Por ejemplo, "00" indica falla de CPU, "55" memoria RAM no detectada y "A0" o "AA" arranque correcto en el SO.',
    hardwareRelevance: 'Herramienta indispensable de diagnóstico rápido para técnicos y overclockers sin necesidad de conectar pantallas ni tarjetas POST dedicadas.',
    relatedTerms: ['post', 'uefi']
  },
  {
    id: 'dual-channel',
    term: 'Dual-Channel (Doble Canal)',
    category: 'memoria',
    shortDefinition: 'Tecnología que duplica el ancho de banda de comunicación entre la memoria y la CPU.',
    fullDefinition: 'Arquitectura que utiliza dos canales de comunicación independientes en lugar de uno. En DDR4 suma dos canales de 64 bits para formar un bus de 128 bits. En DDR5 cada módulo contiene internamente dos subcanales de 32 bits (4 subcanales en total en configuración dual-channel).',
    hardwareRelevance: 'Instalar dos módulos en lugar de uno solo duplica la tasa de transferencia efectiva hacia el procesador.',
    relatedTerms: ['imc', 'daisy-chain']
  },
  {
    id: 'xmp',
    term: 'Intel XMP / AMD EXPO',
    acronym: 'Extreme Memory Profile / Extended Profiles for Overclocking',
    category: 'memoria',
    shortDefinition: 'Perfiles de fábrica preconfigurados en el chip SPD de la RAM para overclocking seguro en un clic.',
    fullDefinition: 'Extensiones estándar sobre los perfiles básicos JEDEC almacenadas en la EEPROM SPD del módulo de memoria. Definen voltajes (VDD), latencias primarias (CL, tRCD, tRP, tRAS) y frecuencias superiores a la norma oficial con garantía de estabilidad validada por el fabricante.',
    hardwareRelevance: 'Se activan en la BIOS/UEFI de la placa base; si no se habilitan, las memorias de alta gama funcionarán a la frecuencia base reducida de JEDEC.',
    relatedTerms: ['uefi', 'pmic', 'imc']
  },
  {
    id: 'vga',
    term: 'Puerto VGA (D-Sub 15)',
    acronym: 'Video Graphics Array',
    category: 'buses',
    shortDefinition: 'Conector analógico azul de 15 pines estándar introducido por IBM en 1987.',
    fullDefinition: 'Interfaz de video analógica RGBHV de 15 pines en tres filas. Reinó en las placas base durante los 90 y 2000 hasta ser sustituida por interfaces digitales DVI, HDMI y DisplayPort.',
    hardwareRelevance: 'Aún se encuentra en placas base comerciales e industriales de bajo costo para compatibilidad con monitores y proyectores legados.',
    relatedTerms: ['hdmi', 'chipset']
  },
  {
    id: 'hdmi',
    term: 'Puerto HDMI / DisplayPort',
    acronym: 'High-Definition Multimedia Interface',
    category: 'buses',
    shortDefinition: 'Interfaces digitales de audio y video de alta definición integradas en el panel trasero.',
    fullDefinition: 'Conectores digitales que transmiten video sin comprimir y audio multicanal directo desde la GPU integrada (iGPU) del procesador a través de las pistas de la placa base. HDMI 2.1 soporta hasta 4K a 120Hz o 8K a 60Hz.',
    hardwareRelevance: 'Permiten utilizar la computadora sin necesidad de adquirir una tarjeta gráfica dedicada.',
    relatedTerms: ['pcie', 'chipset']
  },
  {
    id: 'lan',
    term: 'Controlador de Red (LAN Ethernet)',
    acronym: 'Local Area Network (RJ-45)',
    category: 'buses',
    shortDefinition: 'Chip y conector RJ-45 que suministra conectividad cableada Gigabit o Multi-Gigabit.',
    fullDefinition: 'Controlador PHY/MAC (como Intel I225-V o Realtek RTL8125BG) conectado al chipset a través de PCIe x1. Proporciona tasas de transmisión de 1 Gbps, 2.5 Gbps o 10 Gbps con aislamiento galvánico de pulsos mediante transformadores magnéticos en el conector RJ-45.',
    hardwareRelevance: 'Incluye protección ESD contra sobretensiones y descargas electrostáticas procedentes del cable de red.',
    relatedTerms: ['chipset', 'pcie']
  }
];
