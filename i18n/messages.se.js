const messages = {
  shortNames: ['sv', 'se'],
  longNameSe: 'Svenska',
  longNameEn: 'Swedish',
  messages: {
    // General stuff
    date_format_short: '%Y-%m-%d',

    // Error messages
    error_not_found: 'Tyvärr kunde vi inte hitta sidan du söker',
    error_generic: 'Något gick fel på servern, var god försök igen senare',

    // Ready for test
    ready_paths: 'Klara för test',
    redirect_paths: 'Omdirigeringar',

    // Message keys
    service_name: 'Kurs- och programkatalogen',

    example_message_key: 'Här är en svensk översättning på en label',

    button_label_example: 'Klicka här för att skicka data till servern!',

    field_text_example: 'Data att skicka till API',

    field_label_get_example: 'Min datamodell(Svar från api anrop GET): ',
    field_label_post_example: 'Min datamodell(Svar från api anrop POST): ',

    lang_block_id: '1.272446',
    locale_text: 'Kurs- och programkatalogen på svenska',

    site_name: 'Kurs- och programkatalogen',
    host_name: 'KTH',

    button_mobile_menu_label: 'Öppna/stäng mobilmenyn',
    mobile_menu_aria_label: 'Mobilemeny',

    skip_to_main_content: 'Hoppa till huvudinnehållet',
    back_to_top_label: 'Till sidans topp',

    template_app_works: 'kth-node är igång med hjälp av React!',
    template_store_text: 'Meddelandet från applicationStore',
    template_try_me: 'Testa ut',
    template_button_works: 'Knappen fungerar!',

    semester: {
      1: 'VT',
      2: 'HT',
    },
    general_number_as_word: {
      0: 'noll',
      1: 'ett',
      2: 'två',
      3: 'tre',
      4: 'fyra',
      5: 'fem',
      6: 'sex',
      7: 'sju',
      8: 'åtta',
      9: 'nio',
    },

    main_menu_aria_label: 'Undermeny',
    main_menu_student: 'Student på KTH',
    main_menu_study_at_kth: 'Utbildning',
    main_menu_directory: 'Kurs- och programkatalogen',
    main_menu_page_example: 'Exempel',
    main_menu_shb: 'Studiehandboken 00/01 tom 07/08',
    main_menu_search_all: 'Sök kurs',
    main_menu_third_cycle_studies: 'Forskarutbildning',
    main_menu_third_cycle_departments_list_header: 'Forskarkurser per skola',
    main_menu_third_cycle_courses_search: 'Sök forskarkurs',

    main_page_header_example: 'Exempel',
    main_page_article_lead_example: '”Stora miljoner dag, har.”',
    main_page_article_header_example: 'Löksås ipsum',
    main_page_article_first_paragraph_example:
      'Löksås ipsum samma och hans redan lax annan smultron äng sista, inom del flera erfarenheter mot ännu hela sjö enligt, verkligen omfångsrik inom ska miljoner där ska samma del nu, mot sista som redan räv inom själv del. Inom åker sax vemod dock sin ännu sorgliga häst därmed år icke, inom och tiden ska jäst sin hans ordningens denna stora.',
    main_page_article_second_paragraph_example:
      'Nu äng lax fram olika åker sitt samtidigt dock bäckasiner annan dimma upprätthållande så, blivit händer nu tre gör annan händer precis sin sjö hela. Tidigare tre söka sällan mot hela miljoner tidigare, miljoner häst helt gör hwila göras, rot annan samma flera hela tre. Dimmhöljd dag kan tre vidsträckt kan brunsås sitt så dimma inom och, rännil omfångsrik det tid tiden hav tiden ordningens söka på, sitt vid dimma groda sitt ännu helt inom upprätthållande blivit.',
    main_page_footer_example:
      'Löksås ipsum är en generator för svensk exempeltext, av KJ Vogelius. Då den traditionella exempeltexten – Lorem ipsum – har ordlängder baserade på latin och inte innehåller svenska tecknen ger den inte ett korrekt intryck av text för svenska förhållanden. Inspirerad av Arne Heines exempeltext och baserad på PHP Lorem Ipsum av Mathew Tinsley är detta ett försök att erbjuda något bättre och kanske snäppet festligare, jag menar – vem gillar inte löksås?',

    main_menu_programmes_list: 'Kurser inom program',
    programmes_list_header: 'Kurser inom program',
    programmes_list_lead:
      'Välj program nedan för att få en översikt av de kurser och årskursindelning som utgör programmet.',
    programme_type: {
      TARKU: 'Arkitektutbildning',
      CING: 'Civilingenjörsutbildning',
      YHOGE: 'Högskoleingenjörsutbildning',
      GKAND: 'Kandidatprogram',
      HOGSK: 'Högskoleprogram (2 år)',
      TMAST: 'Masterprogram',
      GMAGB: 'Magisterprogram',
      TBAS: 'Teknisk basutbildning',
      OVRIGA: 'Övriga utbildningsprogram',
    },
    programmes_admitted: 'antagna/kull',
    programmes_admitted_until: 'antagna/kull t.o.m.',
    programmes_admitted_from: 'antagna/kull fr.o.m.',
    programmes_older: 'Program utan nyantagning',
    main_menu_departments_list: 'Kurser per skola',
    departments_list_header: 'Kurser per skola',
    departments_list_lead:
      'Här listas alla KTH:s aktiva kurser på samtliga utbildningsnivåer, uppdelat enligt respektive skolas organisation.',
    departments_deprecated_schools: 'Äldre skolor',
    departments_deprecated_schools_collapsible: 'Kurser äldre skolor',
    department_courses: 'Kurser',
    department_course_code: 'Kurskod',
    department_course_name: 'Kursnamn',
    department_course_credits: 'Omfattning',
    department_course_educational_level: 'Utbildningsnivå',
    department_period_abbr: 'Perioder',
    third_cycle_departments_list_header: 'Forskarkurser per skola',
    programme_study_years: 'Utbildningsplaner',
    programme_study_years_explanation:
      'Välj utbildningsplan. Oftast överensstämmer kull med den termin då studierna påbörjades vid programmet.',
    programme_admitted_year: 'Utbildningsplan kull',
    curriculums_missing_admission: 'Utbildningsplan saknas',
    curriculums_missing_admission_text: school =>
      `Den sökta utbildningsplanen kan inte hittas. För hjälp, kontakta utbildningskansliet för ${school}-skolan.`,
    curriculums_admitted_year_long: 'Årskurs',
    curriculums_studyyear_explanation_1: studyYear =>
      `Enligt utbildningsplanen för programmet ingår dessa kurser i årskurs ${messages.messages.general_number_as_word[studyYear]}.`,
    curriculums_studyyear_explanation_2: year =>
      `Observera att de eventuella anmälningskoder och perioder som anges är baserade på läsåret <strong>${year}</strong>. Läses denna årskurs vid ett senare tillfälle kan andra anmälningskoder och perioder komma att gälla.`,
    curriculums_common_courses: 'Gemensamma kurser',
  },
  shb: {
    pageHeading: 'Studiehandboken 00/01 tom 07/08',
    content: 'Fram till läsåret 2007/2008 fanns information om program och kurser i studiehandboken.',
  },
  thirdCycleSearch: {
    searchHeading: 'Sök forskarkurs',
    leadIntro: 'Här kan du söka bland KTHs forskarutbildningskurser.',
    linkToUsualSearch:
      'På sidan Sök kurs kan du med hjälp av sökkriterier söka bland KTHs samtliga kurser inklusive forskarkurser.',
  },
  bigSearch: {
    searchHeading: 'Sök kurs',
    leadIntro: `Här hittar du KTHs officiella kursinformation. 
    Du kan söka bland alla kurser som ges vid KTH genom att ange hela eller delar av kursnamnet eller kurskoden. 
    Information om vilka kurser som ingår i ett program nås via menyn till vänster.`,
    eduLevel: 'Utbildningsnivå:',
    PREPARATORY: 'Förberedande nivå',
    BASIC: 'Grundnivå',
    ADVANCED: 'Avancerad nivå',
    RESEARCH: 'Forskarnivå',
    showOptions: 'Övrigt:',
    onlyEnglish: 'Ges på engelska',
    onlyMHU: 'Behandlar miljö, miljöteknik eller hållbar utveckling',
    showCancelled: 'Nedlagd kurs',
    summer: 'sommar',
    department: 'Skola, avdelning, etc',
    departmentsAll: 'Samtliga skolor',
    departmentsWithin: 'Alla inom',
  },
  searchInstructions: {
    search_help_collapse_header: 'Få hjälp med sökningen',
    search_help_1:
      'Du kan söka på del av kursnamn eller kurskod. En sökning efter "data" hittar exempelvis såväl "Databasteknik", "Datalogi" som "Algoritmer, datastrukturer och komplexitet".',
    search_help_2: 'Skriver du flera ord i fältet hittas kurser som innehåller samtliga ord.',
    search_help_3: 'Du kan även söka på kursens engelska namn.',
    search_help_4: 'Sökningen visar max 250 träffar. Får du för många träffar, försök att förfina sökvillkoren.',
    search_help_5: 'Sökningen gör ingen skillnad på versaler och gemener (stora och små bokstäver).',
    search_help_6:
      'Det går inte att använda specialtecken (t.ex. citationstecken). Dessa tas bort innan sökningen utförs.',
    search_help_7:
      'Du kan avgränsa sökningen till att endast visa kurser som startar en specifik termin. Standardinställningen är att hitta kurser oavsett när de går.',
    search_help_8:
      'Du kan avgränsa sökningen till att endast visa kurser med engelska som undervisningsspråk. Standardinställningen är att hitta kurser oavsett undervisningsspråk.',
    search_help_9:
      'Du kan välja att även visa kurser som ej längre ges på KTH. Standardinställning är att dessa inte visas.',
    search_help_10:
      'Om du har synpunkter eller frågor gällande kurssökningen, kontakta <a href="mailto:kopps@kth.se">kopps@kth.se</a>.',
  },
  thirdCycleSearchInstructions: {
    search_help_collapse_header: 'Få hjälp med sökningen',
    search_research_help_1:
      'Du kan söka på del av kursnamn eller kurskod. En sökning efter "data" hittar exempelvis såväl "Databasteknik", "Datalogi" som "Algoritmer, datastrukturer och komplexitet".',
    search_research_help_2: 'Skriver du flera ord i fältet hittas kurser som innehåller samtliga ord.',
    search_research_help_3: 'Du kan även söka på kursens engelska namn.',
    search_research_help_4:
      'Sökningen visar max 250 träffar. Får du för många träffar, försök att förfina sökvillkoren.',
    search_research_help_5: 'Sökningen gör ingen skillnad på versaler och gemener (stora och små bokstäver).',
    search_research_help_6:
      'Det går inte att använda specialtecken (t.ex. citationstecken). Dessa tas bort innan sökningen utförs.',
    search_research_help_7: 'Forskarkurser som ej längre ges på KTH visas inte.',
    search_research_help_9:
      'Om du har synpunkter eller frågor gällande kurssökningen, kontakta <a href="mailto:kopps@kth.se">kopps@kth.se</a>.',
  },
  generalSearch: {
    searchStartPeriodPrefix: 'Kursstart',
    resultsHeading: 'Resultat från sökningen',
    searchLabel: 'Ange del av kursnamn eller kurskod:',
    searchText: 'Exempel på kurskod: SF1624',
    searchLoading: 'Söker ...',
    errorUnknown: 'Ett okänt fel inträffade - misslyckad hämtning av kursdata.',
    errorEmpty: 'Din sökning gav inga träffar.',
    errorOverflow: 'Sökningen gav för många träffar.',
    noQueryProvided: 'Ingen frågebegränsning angavs',
    SEPARATOR: '////////////////SEPERATOR',
    search_search_start_prefix: 'Kursstart',
    search_options_h: 'Sökalternativ',
    search_options_hb: 'Välj bland andra sökkriterier',
    search_options_termperiodfilter: 'Visa bara kurser som <b>startar</b> under följande perioder:',
    search_options_summer: 'sommar',
    search_options_label: 'Övrigt:',
    search_options_onlyEnglish: 'Ges på engelska',
    search_options_onlyMHU: 'Behandlar miljö, miljöteknik eller hållbar utveckling',
    search_options_showCancelled: 'Nedlagd kurs',
    search_options_edulevel_label: 'Utbildningsnivå:',
    search_options_edulevel_0: 'Förberedande nivå',
    search_options_edulevel_1: 'Grundnivå',
    search_options_edulevel_2: 'Avancerad nivå',
    search_options_edulevel_3: 'Forskarnivå',
    search_options_edulevel_all: 'Alla',
    search_submit: 'Sök kurs',
    search_results_heading: 'Resultat från sökningen',
    search_results_numberofhits: 'Din sökning gav <b>{0}</b> resultat.',
    search_results_coursename: 'Kursnamn',
    search_results_hp: 'Omfattning',
    search_results_coursecode: 'Kurskod',
    search_results_edulevel: 'Utbildningsnivå',
    search_results_application_code: 'Anm.kod',
    search_results_start_date: 'Startdatum',
    search_note_iscancelled: 'OBS! Kursen är inställd.',
    search_note_isfull: 'OBS! Kursen är fullsatt.',
    search_options_departments_all: 'Samtliga skolor',
    search_options_departments_all_within: 'Alla inom',
    search_options_departments_label: 'Skola, avdelning, etc',
  },
  searchAlarms: {
    errorUnknown: { text: 'Ett okänt fel inträffade - misslyckad hämtning av kursdata' },
    errorEmpty: {
      header: 'Din sökning gav inga träffar.',
      help: 'Mer hjälp hittar du i länken nedan: Få hjälp med sökningen',
    },
    errorOverflow: {
      header: 'Sökningen gav för många träffar',
      text:
        'Det finns för många kurser som matchar det du sökt på. Ange fler bokstäver/siffror i kursnamn eller kurskod (exempel på kurskod: SF1624).',
      help: 'Mer hjälp hittar du i länken nedan: Få hjälp med sökningen',
    },
    noQueryProvided: {
      text: `Ingen frågebegränsning angavs`,
    },
  },
  footerContent: {
    contentContact: 'Kontakt för frågor om utbildning på KTH',
    applicationContact: 'Teknisk kontakt om denna sida',
    centralStudyCounseling: 'Central studievägledning',
    koppsEmailText: 'kopps@kth.se',
  },
}

module.exports = messages
