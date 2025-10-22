export let shortNames: string[];
export let longNameSe: string;
export let longNameEn: string;
export namespace messages {
    let date_format_short: string;
    let ready_paths: string;
    let redirect_paths: string;
    let service_name: string;
    let example_message_key: string;
    let button_label_example: string;
    let field_text_example: string;
    let field_label_get_example: string;
    let field_label_post_example: string;
    let lang_block_id: string;
    let locale_text: string;
    let other_lang: string;
    let language_link_lang_sv: string;
    let menu_panel_search: string;
    let menu_panel_close: string;
    let menu_panel_menu: string;
    let site_name: string;
    let host_name: string;
    let button_mobile_menu_label: string;
    let mobile_menu_aria_label: string;
    let skip_to_main_content: string;
    let back_to_top_label: string;
    let template_app_works: string;
    let template_store_text: string;
    let template_try_me: string;
    let template_button_works: string;
    let course_credits: string;
    let course_scope: string;
    let course_scope_abbr: string;
    let credits: string;
    let creditUnitAbbr: string;
    let courses: string;
    let courses_of_program: string;
    let courses_by_school: string;
    let course_code: string;
    let course_name: string;
    let course_educational_level: string;
    let course_educational_level_abbr: string;
    let course_language: string;
    let course_campus: string;
    let course_pace: string;
    let study_year: string;
    let third_cycle_courses_by_school: string;
    let third_cycle_courses_by_school_description: string;
    let swedish_translation_text: string;
    let general_number_as_word: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
    };
    let semester: {
        1: string;
        2: string;
    };
    let main_menu_aria_label: string;
    let main_menu_studies: string;
    let main_menu_study_at_kth: string;
    let main_menu_directory: string;
    let main_menu_page_example: string;
    let main_menu_shb: string;
    let main_menu_search_all: string;
    let main_menu_third_cycle_studies: string;
    let main_menu_third_cycle_courses_search: string;
    let main_page_header_example: string;
    let main_page_article_lead_example: string;
    let main_page_article_header_example: string;
    let main_page_article_first_paragraph_example: string;
    let main_page_article_second_paragraph_example: string;
    let main_page_footer_example: string;
    let main_page_not_found_page_header: string;
    let main_page_not_found_page_paragraph: string;
    let programmes_list_lead: string;
    namespace programme_type {
        let TARKU: string;
        let CING: string;
        let YHOGE: string;
        let GKAND: string;
        let HOGSK: string;
        let TMAST: string;
        let GMAGB: string;
        let TBAS: string;
        let OVRIGA: string;
    }
    let program_syllabus: string;
    let program_syllabus_link_text: string;
    let programmes_admitted: string;
    let programmes_admitted_until: string;
    let programmes_admitted_from: string;
    let programmes_older: string;
    let departments_list_lead: string;
    let departments_deprecated_schools: string;
    let departments_deprecated_schools_collapsible: string;
    let department_period_abbr: string;
    let programme_study_years: string;
    let programme_study_years_explanation: string;
    let programme_study_years_syllabus_missing: string;
    let programme_study_years_old: string;
    let programme_study_years_old_explanation: string;
    let programme_admitted_year: string;
    let page_footer_pdf: string;
    function program_syllabus_semester_description(semester: any, term: any): string;
    function programme_syllabus_for(programCode: any, term: any): string;
    let curriculums_missing_admission: string;
    function curriculums_missing_admission_text(school: any): string;
    function curriculums_studyyear_explanation_1(studyYear: any): string;
    function curriculums_studyyear_explanation_2(year: any): string;
    let curriculums_common_courses: string;
    let coursesbyprogramme_specialisations: string;
    let coursesbyprogramme_studyyear_noinfofound_header: string;
    function coursesbyprogramme_studyyear_noinfofound(school: any): string;
    function programme_courses(code: any): string;
    namespace elective_condition {
        let ALL: string;
        let O: string;
        let VV: string;
        let R: string;
        let V: string;
    }
    let free_texts_header: string;
    namespace pdf_error {
        let heading: string;
        let error: string;
        let help: string;
    }
    namespace pdf_popup_warnings {
        let popup_block_heading: string;
        let popup_block_warning: string;
    }
    let coursesbyprogramme_labels_course: string;
    let coursesbyprogramme_labels_code: string;
    let coursesbyprogramme_labels_code_abbr: string;
    function coursesbyprogramme_labels_period(period: any): string;
    function coursesbyprogramme_labels_period_abbr(period: any): string;
    let programme_plan_pdf_header: string;
    let programme_plan_pdf_text: string;
    function programme_plan_pdf(programmeCode: any, term: any): string;
    let programme_programwebb_heading: string;
    let programme_programwebb_text: string;
    function programme_programwebb_linktext(programmeCode: any): string;
    let programme_objectives: string;
    let programme_objectives_approved: string;
    let programme_objectives_knowledge_and_understanding: string;
    let programme_objectives_skills_and_abilities: string;
    let programme_objectives_ability_to_judgements: string;
    let programme_extent_and_content: string;
    let programme_eligibility_and_selection: string;
    let programme_implementation: string;
    let programme_structure: string;
    let appendix1: string;
    let appendix2: string;
    let programme_appendix1: string;
    let programme_appendix2: string;
    let programme_grading_system: string;
    let programme_participation: string;
    let programme_previous_studies: string;
    let programme_studies_abroad: string;
    let programme_degree_project: string;
    let programme_degree: string;
    let programme_supplementary_information: string;
    let programme_conditionally_elective_courses_info: string;
    namespace programme_edulevel {
        let PREPARATORY: string;
        let BASIC: string;
        let ADVANCED: string;
        let RESEARCH: string;
    }
    let programme_appendix2_empty: string;
    let programme_appendix2_empty_description: string;
}
export namespace shb {
    let pageHeading: string;
    let shbLink: string;
    let content: string;
}
export namespace thirdCycleSearch {
    let searchHeading: string;
    let leadIntro: string;
    let linkToUsualSearch: string;
}
export namespace bigSearch {
    let searchHeading_1: string;
    export { searchHeading_1 as searchHeading };
    export let searchButton: string;
    let leadIntro_1: string;
    export { leadIntro_1 as leadIntro };
    export let eduLevel: string;
    export let semesters: string;
    let PREPARATORY_1: string;
    export { PREPARATORY_1 as PREPARATORY };
    let BASIC_1: string;
    export { BASIC_1 as BASIC };
    let ADVANCED_1: string;
    export { ADVANCED_1 as ADVANCED };
    let RESEARCH_1: string;
    export { RESEARCH_1 as RESEARCH };
    export let showOptions: string;
    export let onlyEnglish: string;
    export let onlyMHU: string;
    export let onlyMHULabel: string;
    export let showCancelled: string;
    export let summer: string;
    export let department: string;
    export let departmentsAll: string;
    export let departmentsWithin: string;
    export let clearFilters: string;
}
export namespace searchInstructions {
    let search_help_collapse_header: string;
    let search_help_1: string;
    let search_help_2: string;
    let search_help_3: string;
    let search_help_4: string;
    let search_help_5: string;
    let search_help_6: string;
    let search_help_7: string;
    let search_help_8: string;
    let search_help_9: string;
    let search_help_10: string;
}
export namespace thirdCycleSearchInstructions {
    let search_help_collapse_header_1: string;
    export { search_help_collapse_header_1 as search_help_collapse_header };
    export let search_research_help_1: string;
    export let search_research_help_2: string;
    export let search_research_help_3: string;
    export let search_research_help_4: string;
    export let search_research_help_5: string;
    export let search_research_help_6: string;
}
export namespace generalSearch {
    let collapseHeaderOtherSearchOptions: string;
    let searchStartPeriodPrefix: string;
    let resultsHeading: string;
    let showResults: string;
    let searchLabel: string;
    let searchText: string;
    let searchLoading: string;
    let errorUnknown: string;
    let errorEmpty: string;
    let errorOverflow: string;
    let noQueryProvided: string;
    let courseHasNoRounds: string;
    let courseHasNoRoundsInTableCell: string;
    let linkToInforKursval: string;
    let filtersLabel: string;
    namespace toggleButton {
        let list: string;
        let table: string;
    }
}
export namespace programmeSyllabusSearch {
    let searchLabel_1: string;
    export { searchLabel_1 as searchLabel };
    export let noResults: string;
}
export namespace literatureList {
    export function title(term: any, schoolCode: any): string;
    let heading_1: string;
    export { heading_1 as heading };
    export function subHeading(schoolName: any, term: any): string;
    export let navHeading: string;
    export let breadcrumb: string;
    export function intro(schoolName: any, term: any): string;
    export let missing: string;
    export let departmentsOtherUni: string;
}
export namespace searchAlarms {
    export namespace errorUnknown_1 {
        let text: string;
    }
    export { errorUnknown_1 as errorUnknown };
    export namespace errorKodEllerBenamning {
        let text_1: string;
        export { text_1 as text };
    }
    export namespace errorEmpty_1 {
        let header: string;
    }
    export { errorEmpty_1 as errorEmpty };
    export namespace errorOverflow_1 {
        let header_1: string;
        export { header_1 as header };
        let text_2: string;
        export { text_2 as text };
    }
    export { errorOverflow_1 as errorOverflow };
    export namespace noQueryProvided_1 {
        let text_3: string;
        export { text_3 as text };
    }
    export { noQueryProvided_1 as noQueryProvided };
}
export namespace footerContent {
    let contentContact: string;
    let applicationContact: string;
    let centralStudyCounseling: string;
    let koppsEmailText: string;
}
export namespace breadCrumbs {
    let student: string;
    let studies: string;
    let directory: string;
    let university: string;
}
