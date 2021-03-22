module.exports = {
  shortNames: ['sv', 'se'],
  longNameSe: 'Svenska',
  longNameEn: 'Swedish',
  messages: {
    // General stuff
    date_format_short: '%Y-%m-%d',

    // Error messages
    error_not_found: 'Tyvärr kunde vi inte hitta sidan du söker',
    error_generic: 'Något gick fel på servern, var god försök igen senare',

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

    koppspublic_courses: 'Kurser',
    koppspublic_search_title: 'Sök kurs',
    koppspublic_search_introduction:
      'Här hittar du KTHs officiella kursinformation. Du kan söka bland alla kurser som ges vid KTH genom att ange hela eller delar av kursnamnet eller kurskoden. Information om vilka kurser som ingår i ett program nås via menyn till vänster.',
    koppspublic_search_help_h: 'Få hjälp med sökningen',
    koppspublic_search_help_1:
      'Du kan söka på del av kursnamn eller kurskod. En sökning efter "data" hittar exempelvis såväl "Databasteknik", "Datalogi" som "Algoritmer, datastrukturer och komplexitet".',
    koppspublic_search_help_2: 'Skriver du flera ord i fältet hittas kurser som innehåller samtliga ord_',
    koppspublic_search_help_3: 'Du kan även söka på kursens engelska namn.',
    koppspublic_search_help_4:
      'Sökningen visar max {0} träffar. Får du för många träffar, försök att förfina sökvillkoren.',
    koppspublic_search_help_5: 'Sökningen gör ingen skillnad på versaler och gemener (stora och små bokstäver).',
    koppspublic_search_help_6:
      'Det går inte att använda specialtecken (t.ex. citationstecken). Dessa tas bort innan sökningen utförs.',
    koppspublic_search_help_7:
      'Du kan avgränsa sökningen till att endast visa kurser som startar en specifik termin. Standardinställningen är att hitta kurser oavsett när de går.',
    koppspublic_search_help_8:
      'Du kan avgränsa sökningen till att endast visa kurser med engelska som undervisningsspråk. Standardinställningen är att hitta kurser oavsett undervisningsspråk.',
    koppspublic_search_help_9:
      'Du kan välja att även visa kurser som ej längre ges på KTH. Standardinställning är att dessa inte visas.',
    koppspublic_search_error_unknown: '<p><b>Ett okänt fel inträffade - misslyckad hämtning av kursdata</b></p>',
    koppspublic_search_error_overflow:
      '<p><b>Sökningen gav för många träffar</b></p><p>Det finns för många kurser som matchar det du sökt på. Ange fler bokstäver/siffror i kursnamn eller kurskod (exempel på kurskod: SF1624).</p><p>Mer hjälp hittar du i länken nedan: Få hjälp med sökningen</p>',
    koppspublic_search_error_emptysearch:
      '<p><b>Din sökning gav inga träffar.</b></p><p>Mer hjälp hittar du i länken nedan: Få hjälp med sökningen</p>',
    koppspublic_search_search_start_prefix: 'Kursstart',
    koppspublic_search_search_label: 'Ange del av kursnamn eller kurskod:',
    koppspublic_search_search_text: 'Exempel på kurskod: SF1624',
    koppspublic_search_options_h: 'Sökalternativ',
    koppspublic_search_options_hb: 'Välj bland andra sökkriterier',
    koppspublic_search_options_termperiodfilter: 'Visa bara kurser som <b>startar</b> under följande perioder:',
    koppspublic_search_options_summer: 'sommar',
    koppspublic_search_options_label: 'Övrigt:',
    koppspublic_search_options_onlyEnglish: 'Ges på engelska',
    koppspublic_search_options_onlyMHU: 'Behandlar miljö, miljöteknik eller hållbar utveckling',
    koppspublic_search_options_showCancelled: 'Nedlagd kurs',
    koppspublic_search_options_edulevel_label: 'Utbildningsnivå:',
    koppspublic_search_options_edulevel_0: 'Förberedande nivå',
    koppspublic_search_options_edulevel_1: 'Grundnivå',
    koppspublic_search_options_edulevel_2: 'Avancerad nivå',
    koppspublic_search_options_edulevel_3: 'Forskarnivå',
    koppspublic_search_options_edulevel_all: 'Alla',
    koppspublic_search_submit: 'Sök kurs',
    koppspublic_search_results_heading: 'Resultat från sökningen',
    koppspublic_search_results_numberofhits: 'Din sökning gav <b>{0}</b> resultat.',
    koppspublic_search_results_coursename: 'Kursnamn',
    koppspublic_search_results_hp: 'Omfattning',
    koppspublic_search_results_coursecode: 'Kurskod',
    koppspublic_search_results_edulevel: 'Utbildningsnivå',
    koppspublic_search_results_application_code: 'Anm.kod',
    koppspublic_search_results_start_date: 'Startdatum',
    koppspublic_search_note_iscancelled: 'OBS! Kursen är inställd.',
    koppspublic_search_note_isfull: 'OBS! Kursen är fullsatt.',
    koppspublic_search_options_departments_all: 'Samtliga skolor',
    koppspublic_search_options_departments_all_within: 'Alla inom',
    koppspublic_search_options_departments_label: 'Skola, avdelning, etc',

    main_menu_aria_label: 'Undermeny',
    main_menu_student: 'Student på KTH',
    main_menu_directory: 'Kurs- och programkatalogen',
    main_menu_page_one: 'Första sidan',
    main_menu_page_two: 'Andra sidan',
    main_menu_page_three: 'Tredje sidan',
  },
}
