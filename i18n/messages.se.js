const messages = {
  shortNames: ['sv', 'se'],
  longNameSe: 'Svenska',
  longNameEn: 'Swedish',
  messages: {
    // General stuff
    date_format_short: '%Y-%m-%d',

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
    locale_text: 'KTH på svenska',
    other_lang: 'Denna sida på svenska',

    language_link_lang_en: 'English',
    menu_panel_search: 'Sök',
    menu_panel_close: 'Stäng',
    menu_panel_menu: 'Meny',

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

    course_credits: 'Omfattning',
    course_scope: 'Omfattning',
    course_scope_abbr: 'Omf.',
    credits: 'hp',
    creditUnitAbbr: 'högskolepoäng',

    courses: 'Kurser',
    courses_of_program: 'Utbildningsplaner',
    courses_by_school: 'Kurser per skola',

    course_code: 'Kurskod',
    course_name: 'Kursnamn',
    course_educational_level: 'Utbildningsnivå',
    course_educational_level_abbr: 'Utbildningsnivå',

    study_year: 'Årskurs',

    third_cycle_courses_by_school: 'Forskarkurser per skola',
    third_cycle_courses_by_school_description:
      'Här hittar du information om forskarkurser på KTH. Kurserna är sorterade efter KTH:s skolor och deras organisationer. Använd menyalternativet Sök forskarkurs för att söka fram en kurs eller filtrera på kurser som behandlar miljö, miljöteknik eller hållbar utveckling.',

    // TODO: MOVE TO kth-course-program-vocabulary

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
    semester: {
      1: 'VT',
      2: 'HT',
    },
    main_menu_aria_label: 'Undermeny',
    main_menu_studies: 'Studier',
    main_menu_study_at_kth: 'Utbildning',
    main_menu_directory: 'Kurs- och programkatalogen',
    main_menu_page_example: 'Exempel',
    main_menu_shb: 'Studier före 07/08',
    main_menu_search_all: 'Sök kurser',
    main_menu_search_all_new: 'Sök kurser (ny)',
    main_menu_third_cycle_studies: 'Forskarutbildning',
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
    main_page_not_found_page_header: 'Sidan kunde inte hittas',
    main_page_not_found_page_paragraph:
      'Du har angivit en adress eller klickat på en länk till en webbsida som inte finns på KTHs webbplats. Kontakta KTHs webbansvariga om du följde en felaktig länk från någon av KTHs webbsidor. Ange webbadress för sidan med den felaktiga länken och till vilken adress länken pekar.',
    programmes_list_lead:
      'Här hittar du alla utbildningsplaner på KTH. Varje årskull inom ett program har en egen utbildningsplan. I utbildningsplanen finns information om bland annat vilka kurser som ingår i programmet och vad som gäller för urval och behörighet.',
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
    program_syllabus: 'Utbildningsplan',
    program_syllabus_link_text:
      'En tillgänglighetsanpassad version av utbildningsplanen finns i Kurs- och programkatalogen.',
    programmes_admitted: 'antagna/kull',
    programmes_admitted_until: 'antagna/kull t.o.m.',
    programmes_admitted_from: 'antagna/kull fr.o.m.',
    programmes_older: 'Program utan nyantagning',
    departments_list_lead:
      'Här finns info om kurser på KTH. Kurserna är sorterade efter KTH:s skolor och deras organisationer. För att söka fram enbart aktuella kurser, använd menyalternativet Sök kurser och filtrera på termin och läsperiod. Vilka kurser som ingår i ett program finns under menyalternativet Utbildningsplaner.',
    departments_deprecated_schools: 'Äldre skolor',
    departments_deprecated_schools_collapsible: 'Kurser äldre skolor',
    department_period_abbr: 'Perioder',
    programme_study_years: 'Utbildningsplaner',
    page_footer_pdf: 'Sida " counter(page) " av " counter(pages)',
    program_syllabus_semester_description: (semester, year) =>
      `Gäller för antagna till utbildningen fr o m ${semester + year}`,
    programme_syllabus_for: (programCode, term) =>
      `Utbildningsplan för ${programCode} gällande antagning fr o m ${term}`,
    programme_study_years_explanation:
      'Välj utbildningsplan. Varje årskull inom ett program har en egen utbildningsplan. I utbildningsplanen finns information om bland annat vilka kurser som ingår i programmet. ',
    programme_study_years_syllabus_missing: 'Utbildningsplan enligt 2007 års studieordning saknas.',
    programme_study_years_old: 'Äldre utbildningsplaner',
    programme_study_years_old_explanation: 'Fram till läsåret 2007/2008 fanns utbildningsplanerna i studiehandboken.',
    programme_admitted_year: 'Utbildningsplan kull',
    curriculums_missing_admission: 'Utbildningsplan saknas',
    curriculums_missing_admission_text: school =>
      `Den sökta utbildningsplanen kan inte hittas. För hjälp, kontakta utbildningskansliet för ${school}-skolan.`,
    curriculums_studyyear_explanation_1: studyYear =>
      `Enligt utbildningsplanen för programmet ingår dessa kurser i årskurs ${messages.messages.general_number_as_word[studyYear]}.`,
    curriculums_studyyear_explanation_2: year =>
      `Observera att de eventuella anmälningskoder och perioder som anges är baserade på läsåret <strong>${year}</strong>. Läses denna årskurs vid ett senare tillfälle kan andra anmälningskoder och perioder komma att gälla.`,
    curriculums_common_courses: 'Gemensamma kurser',
    coursesbyprogramme_specialisations: 'Inriktningar',
    coursesbyprogramme_studyyear_noinfofound_header: 'Information saknas',
    coursesbyprogramme_studyyear_noinfofound: school => `Information om årskursen saknas. Kontakta ${school}-skolan.`,
    programme_courses: code => `Kurser (${code})`,
    elective_condition: {
      ALL: 'Alla',
      O: 'Obligatoriska',
      VV: 'Villkorligt valfria',
      R: 'Rekommenderade',
      V: 'Valfria',
    },
    pdf_error: {
      heading: 'Något har gått fel - Prova att ladda om sidan',
      error:
        'Tyvärr har något gått fel. Systemet har inte lyckats hämta utbildningsplanen som PDF. Försök att ladda om sidan.',
      help: 'Kontakta IT-support ifall du har några frågor. ',
    },
    pdf_popup_warnings: {
      popup_block_heading: 'Tillåt popup-fönster för att se PDF-filen - Pröva sedan att ladda om sidan',
      popup_block_warning:
        'Du behöver tillåta pop up-fönster i dina webbläsarinställningar för att se PDF-filen. Ladda om sidan efter att du har ändrat dina inställningar.',
    },
    coursesbyprogramme_labels_course: 'Kursens kod och namn',
    coursesbyprogramme_labels_code: 'Anmälningskod',
    coursesbyprogramme_labels_code_abbr: 'Anm.\u00A0kod',
    coursesbyprogramme_labels_period: period => `Läsperiod ${period}`,
    coursesbyprogramme_labels_period_abbr: period => `P${period}`,
    programme_plan_pdf_header: 'Ut\u00ADbild\u00ADnings\u00ADplan som pdf',
    programme_plan_pdf_text:
      'Pdf:en är inte helt till\u00ADgäng\u00ADlig\u00ADhets\u00ADan\u00ADpas\u00ADsad, men allt inne\u00ADhåll finns också på dessa webb\u00ADsidor.',
    programme_plan_pdf: (programmeCode, term) => `Ut\u00ADbild\u00ADnings\u00ADplan ${programmeCode} ${term}`,
    programme_programwebb_heading: `För dig som läser programmet`,
    programme_programwebb_text: `När du har registrerat dig på den första kursen i ditt program hittar du en länk till ditt programrum i Canvas i Personliga menyn.`,
    programme_programwebb_linktext: programmeCode => `Programwebb ${programmeCode}`,
    programme_objectives: 'Utbildningens mål',
    programme_objectives_changed: 'Senast ändrad',
    programme_objectives_approved: 'Godkänd',
    programme_objectives_knowledge_and_understanding: 'Kunskap och förståelse',
    programme_objectives_skills_and_abilities: 'Färdigheter och förmågor',
    programme_objectives_ability_to_judgements: 'Värderingsförmåga och förhållningssätt',
    programme_extent_and_content: 'Utbildningens omfattning och innehåll',
    programme_eligibility_and_selection: 'Behörighet och urval',
    programme_implementation: 'Utbildningens genomförande',
    programme_structure: 'Utbildningens upplägg',
    programme_implementation_courses_intro: 'Utbildningen sker i kursform. Kurslistor finns i',
    appendix1: 'Bilaga 1',
    appendix2: 'Bilaga 2',
    programme_appendix1: 'Bilaga 1: Kurslista',
    programme_appendix2: 'Bilaga 2: Inriktningar',
    programme_grading_system: 'Betygssystem',
    programme_grading_system_intro:
      'För kurser på KTH används en sjugradig målrelaterad betygsskala A-F som slutbetyg för kurser på grundnivå och avancerad nivå. A-E är godkända betyg med A som högsta betyg. Betygen godkänd (P) och underkänd (F) används som slutbetyg då särskilda skäl föreligger.',
    programme_participation: 'Villkor för deltagande i utbildningen',
    programme_previous_studies: 'Tillgodoräknanden',
    programme_studies_abroad: 'Utlandsstudier',
    programme_degree_project: 'Examensarbete',
    programme_degree: 'Examen',
    programme_supplementary_information: 'Kompletterande information',
    programme_conditionally_elective_courses_info: 'Information om villkorligt valfria kurser',
    programme_edulevel: {
      PREPARATORY: 'Förberedande nivå',
      BASIC: 'Grundnivå',
      ADVANCED: 'Avancerad nivå',
      RESEARCH: 'Forskarnivå',
    },
    programme_appendix2_empty: 'Programmet har inga inriktningar.',
    programme_appendix2_empty_description: 'Ingen information inlagd.',
  },
  shb: {
    pageHeading: 'Studier före 07/08',
    shbLink: 'Studiehandboken 00/01 tom 07/08',
    content: 'Fram till läsåret 2007/2008 fanns information om program och kurser i studiehandboken.',
  },
  thirdCycleSearch: {
    searchHeading: 'Sök forskarkurs',
    leadIntro:
      'Här kan du söka bland KTHs forskarutbildningskurser. Sök på kursnamn, del av kursnamn eller kurskod. Du kan även filtrera på skola och kurser som behandlar miljö, miljöteknik eller hållbar utveckling.',
    linkToUsualSearch: 'Sök bland KTHs samtliga kurser inklusive forskarkurser.',
  },
  bigSearch: {
    searchHeading: 'Sök kurser',
    searchButton: 'Sök kurs',
    leadIntro:
      'Här finns info om kurser på KTH: kursplan, kurs-PM och kursanalyser. Sök på kursnamn eller kurskod, du kan även filtrera på termin och läsperiod. Vilka kurser som ingår i ett program finns under Utbildningsplaner.',
    eduLevel: 'Utbildningsnivå:',
    PREPARATORY: 'Förberedande nivå',
    BASIC: 'Grundnivå',
    ADVANCED: 'Avancerad nivå',
    RESEARCH: 'Forskarnivå',
    showOptions: 'Övrigt:',
    onlyEnglish: 'Ges på engelska',
    onlyMHU: 'Behandlar miljö, miljöteknik eller hållbar utveckling',
    onlyMHULabel: 'Miljö',
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
    search_research_help_1: 'Du kan söka på del av kursnamn eller kurskod.',
    search_research_help_2: 'Skriver du flera ord i fältet hittas kurser som innehåller samtliga ord.',
    search_research_help_3: 'Du kan även söka på kursens engelska namn.',
    search_research_help_4:
      'Sökningen visar max 250 träffar. Får du för många träffar, försök att förfina sökvillkoren.',
    search_research_help_5: 'Forskarkurser som ej längre ges på KTH visas inte.',
    search_research_help_6: 'Du kan filtrera på kurser som behandlar miljö, miljöteknik eller hållbar utveckling.',
  },
  generalSearch: {
    collapseHeaderOtherSearchOptions: 'Filtrera dina sökval',
    searchStartPeriodPrefix: 'Kursstart',
    resultsHeading: 'Resultat från sökningen',
    searchLabel: 'Sök på kursnamn eller kurskod',
    searchText: 'Exempel på kurskod: SF1624',
    searchLoading: 'Söker ...',
    errorUnknown: 'Ett okänt fel inträffade - misslyckad hämtning av kursdata.',
    errorEmpty: 'Din sökning gav inga träffar.',
    errorOverflow: 'Sökningen gav för många träffar.',
    noQueryProvided: 'Ingen frågebegränsning angavs',
    filtersLabel: 'Filtrera dina sökval',
  },
  literatureList: {
    title: (term, schoolCode) => `Litteraturlista ${term} ${schoolCode}`,
    heading: 'Litteraturlista',
    subHeading: (schoolName, term) => `${schoolName}, ${term}`,
    navHeading: 'Litteraturlistor',
    breadcrumb: 'Litteraturlistor',
    intro: (schoolName, term) =>
      `Här visas information om kurslitteratur enligt gällande kursplan för kurser som ges av ${schoolName} och pågår ${term}.`,
    missing: '(information saknas)',
    departmentsOtherUni: 'Samarbete med andra universitet',
  },
  searchAlarms: {
    errorUnknown: { text: 'Ett okänt fel inträffade - misslyckad hämtning av kursdata' },
    errorEmpty: {
      header: 'Din sökning gav inga träffar.',
      help: 'Mer hjälp hittar du i länken nedan: Få hjälp med sökningen',
    },
    errorOverflow: {
      header: 'Sökningen gav för många träffar',
      text: 'Det finns för många kurser som matchar det du sökt på. Ange fler bokstäver/siffror i kursnamn eller kurskod (exempel på kurskod: SF1624).',
      help: '', // we don't have this link anymore so we should decide what we are going to show as a help text
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
  breadCrumbs: {
    student: 'Studentwebben',
    studies: 'Studier',
    directory: 'Kurs- och programkatalogen',
    university: 'KTH',
  },
}

module.exports = messages
