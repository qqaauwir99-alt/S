import { GenealogyNode } from '../types';

export const genealogyTree: GenealogyNode = {
  id: 'qahtan',
  name: 'قحطان',
  subtitle: 'الجد الجامع لعرب الجنوب',
  locked: false,
  primary: true,
  category: 'ancestor',
  generation: 1,
  children: [
    { id: 'qahtan-lai', name: 'لأي', locked: true, children: [] },
    { id: 'qahtan-jaber', name: 'جابر', locked: true, children: [] },
    { id: 'qahtan-almutalammis', name: 'المتلمس', locked: true, children: [] },
    { id: 'qahtan-alasi', name: 'العاصي', locked: true, children: [] },
    { id: 'qahtan-gashim', name: 'غاشم', locked: true, children: [] },
    { id: 'qahtan-almutaghashmir', name: 'المتغشمر', locked: true, children: [] },
    { id: 'qahtan-ghadhib', name: 'غاضب', locked: true, children: [] },
    { id: 'qahtan-muazziz', name: 'معزز', locked: true, children: [] },
    { id: 'qahtan-manee', name: 'منيع', locked: true, children: [] },
    { id: 'qahtan-alqitami', name: 'القطامي', locked: true, children: [] },
    { id: 'qahtan-dhalim', name: 'ظالم', locked: true, children: [] },
    { id: 'qahtan-nabatah', name: 'نباتة', locked: true, children: [] },
    {
      id: 'qahtan-harith',
      name: 'الحارث',
      subtitle: 'الحارث بن قحطان',
      fatherName: 'قحطان',
      locked: false,
      primary: true,
      category: 'ancestor',
      generation: 2,
      children: [
        { id: 'harith-fahm', name: 'فهم', locked: true, children: [] },
        {
          id: 'harith-yarub',
          name: 'يعرب',
          subtitle: 'يعرب بن قحطان',
          fatherName: 'الحارث',
          locked: false,
          primary: true,
          category: 'ancestor',
          generation: 3,
          children: [
            { id: 'yarub-haydan', name: 'حيدان', locked: true, children: [] },
            { id: 'yarub-janada', name: 'جنادة', locked: true, children: [] },
            { id: 'yarub-wael', name: 'وائل', locked: true, children: [] },
            { id: 'yarub-kaab', name: 'كعب', locked: true, children: [] },
            {
              id: 'yarub-yashjub',
              name: 'يشجب',
              fatherName: 'يعرب',
              locked: false,
              primary: true,
              category: 'ancestor',
              generation: 4,
              children: [
                {
                  id: 'yashjub-saba',
                  name: 'سبأ — عامر',
                  subtitle: 'عامر بن يشجب الملقب بسبأ',
                  fatherName: 'يشجب',
                  locked: false,
                  primary: true,
                  category: 'ancestor',
                  generation: 5,
                  children: [
                    {
                      id: 'saba-kahlan',
                      name: 'كهلان',
                      subtitle: 'أحد جذمي قحطان العظيمين',
                      fatherName: 'سبأ',
                      locked: false,
                      primary: true,
                      category: 'tribe',
                      generation: 6,
                      children: [
                        {
                          id: 'kahlan-zayd',
                          name: 'زيد',
                          subtitle: 'زيد بن كهلان',
                          fatherName: 'كهلان',
                          locked: false,
                          primary: true,
                          category: 'ancestor',
                          generation: 7,
                          children: [
                            { id: 'zayd-malik', name: 'مالك', locked: true, children: [] },
                            { id: 'zayd-ghalib', name: 'غالب', locked: true, children: [] },
                            {
                              id: 'zayd-urayb',
                              name: 'عريب',
                              fatherName: 'زيد بن كهلان',
                              locked: false,
                              primary: true,
                              category: 'ancestor',
                              generation: 8,
                              children: [
                                {
                                  id: 'urayb-amr',
                                  name: 'عمرو',
                                  fatherName: 'عريب',
                                  locked: false,
                                  primary: true,
                                  category: 'ancestor',
                                  generation: 9,
                                  children: [
                                    { id: 'amr-alhumaysa', name: 'الهميسع', locked: true, children: [] },
                                    {
                                      id: 'amr-zayd',
                                      name: 'زيد',
                                      fatherName: 'عمرو بن عريب',
                                      locked: false,
                                      primary: true,
                                      category: 'ancestor',
                                      generation: 10,
                                      children: [
                                        {
                                          id: 'zayd-udad',
                                          name: 'أدد',
                                          fatherName: 'زيد بن عمرو',
                                          locked: false,
                                          primary: true,
                                          category: 'ancestor',
                                          generation: 11,
                                          children: [
                                            { id: 'udad-nabt-alashar', name: 'نبت — الأشعر', locked: true, children: [] },
                                            { id: 'udad-malik-madhhij', name: 'مالك — مذحج', locked: true, children: [] },
                                            { id: 'udad-julhuma-tayy', name: 'جلهمة — طيء', locked: true, children: [] },
                                            {
                                              id: 'udad-murra',
                                              name: 'مرة',
                                              fatherName: 'أدد',
                                              locked: false,
                                              primary: true,
                                              category: 'ancestor',
                                              generation: 12,
                                              children: [
                                                { id: 'murra-ruhum', name: 'رهم', locked: true, children: [] },
                                                {
                                                  id: 'murra-harith',
                                                  name: 'الحارث',
                                                  subtitle: 'الحارث بن مرة',
                                                  fatherName: 'مرة بن أدد',
                                                  locked: false,
                                                  primary: true,
                                                  category: 'ancestor',
                                                  generation: 13,
                                                  children: [
                                                    { id: 'harith-malik', name: 'مالك', locked: true, children: [] },
                                                    {
                                                      id: 'harith-adi',
                                                      name: 'عدي',
                                                      fatherName: 'الحارث بن مرة',
                                                      locked: false,
                                                      primary: true,
                                                      category: 'ancestor',
                                                      generation: 14,
                                                      children: [
                                                        { id: 'adi-malik-lakhm', name: 'مالك — لخم', locked: true, children: [] },
                                                        { id: 'adi-amr-judham', name: 'عمرو — جذام', locked: true, children: [] },
                                                        { id: 'adi-harith-amila', name: 'الحارث — عاملة', locked: true, children: [] },
                                                        {
                                                          id: 'adi-ufayr',
                                                          name: 'عفير',
                                                          fatherName: 'عدي بن الحارث',
                                                          locked: false,
                                                          primary: true,
                                                          category: 'ancestor',
                                                          generation: 15,
                                                          children: [
                                                            {
                                                              id: 'ufayr-kindi',
                                                              name: 'كندي',
                                                              subtitle: 'جد قبيلة كندة الملوكية',
                                                              fatherName: 'عفير بن عدي',
                                                              locked: false,
                                                              primary: true,
                                                              category: 'tribe',
                                                              generation: 16,
                                                              children: [
                                                                { id: 'kindi-ashras', name: 'أشرس', locked: true, children: [] },
                                                                {
                                                                  id: 'kindi-muawiya',
                                                                  name: 'معاوية',
                                                                  fatherName: 'كندي',
                                                                  locked: false,
                                                                  primary: true,
                                                                  category: 'ancestor',
                                                                  generation: 17,
                                                                  children: [
                                                                    { id: 'muawiya-yazid', name: 'يزيد', locked: true, children: [] },
                                                                    {
                                                                      id: 'muawiya-muratta',
                                                                      name: 'مرتع — عمرو',
                                                                      fatherName: 'معاوية بن كندي',
                                                                      locked: false,
                                                                      primary: true,
                                                                      category: 'ancestor',
                                                                      generation: 18,
                                                                      children: [
                                                                        { id: 'muratta-thawr-kinda', name: 'ثور — كندة', locked: true, children: [] },
                                                                        { id: 'muratta-qays', name: 'قيس', locked: true, children: [] },
                                                                        {
                                                                          id: 'muratta-malik-as-sadaf',
                                                                          name: 'مالك — الصدف',
                                                                          subtitle: 'الجد الجامع للصدف',
                                                                          fatherName: 'مرتع بن معاوية',
                                                                          locked: false,
                                                                          primary: true,
                                                                          category: 'tribe',
                                                                          generation: 19,
                                                                          children: [
                                                                            {
                                                                              id: 'malik-as-sadafi',
                                                                              name: 'مالك الصدفي',
                                                                              subtitle: 'الفرع الصدفي الذي ورد فيه نسب صيعر',
                                                                              relationType: 'tribal',
                                                                              relationLabel: 'من الصدف',
                                                                              locked: false,
                                                                              primary: true,
                                                                              category: 'ancestor',
                                                                              generation: 20,
                                                                              children: [
                                                                                {
                                                                                  id: 'sadafi-khuraym',
                                                                                  name: 'خريم',
                                                                                  subtitle: 'خريم الصدفي (المعتمد في الشجرة)',
                                                                                  fatherName: 'مالك الصدفي',
                                                                                  locked: false,
                                                                                  primary: true,
                                                                                  category: 'ancestor',
                                                                                  generation: 21,
                                                                                  children: [
                                                                                    {
                                                                                      id: 'khuraym-malik',
                                                                                      name: 'مالك',
                                                                                      fatherName: 'خريم',
                                                                                      locked: false,
                                                                                      primary: true,
                                                                                      category: 'ancestor',
                                                                                      generation: 22,
                                                                                      children: [
                                                                                        {
                                                                                          id: 'malik-alashmoos',
                                                                                          name: 'الأشموس',
                                                                                          fatherName: 'مالك بن خريم',
                                                                                          locked: false,
                                                                                          primary: true,
                                                                                          category: 'ancestor',
                                                                                          generation: 23,
                                                                                          children: [
                                                                                            {
                                                                                              id: 'alashmoos-sayaar',
                                                                                              name: 'صيعر',
                                                                                              subtitle: 'فروع صيعر — الجد المنسوب إليه القبيلة',
                                                                                              fatherName: 'الأشموس',
                                                                                              locked: false,
                                                                                              primary: true,
                                                                                              category: 'tribe',
                                                                                              generation: 24,
                                                                                              children: [
                                                                                                {
                                                                                                  id: 'sayaar-layth',
                                                                                                  name: 'ليث',
                                                                                                  fatherName: 'صيعر',
                                                                                                  locked: false,
                                                                                                  primary: true,
                                                                                                  category: 'branch',
                                                                                                  generation: 25,
                                                                                                  children: [
                                                                                                    { id: 'layth-al-mohammed', name: 'آل محمد', locked: true, children: [] },
                                                                                                    {
                                                                                                      id: 'layth-al-ali',
                                                                                                      name: 'آل علي',
                                                                                                      fatherName: 'ليث بن صيعر',
                                                                                                      locked: false,
                                                                                                      primary: true,
                                                                                                      category: 'branch',
                                                                                                      generation: 26,
                                                                                                      children: [
                                                                                                        { id: 'al-ali-alkassaleen', name: 'الكسالين', locked: true, children: [] },
                                                                                                        {
                                                                                                          id: 'al-ali-al-muslim',
                                                                                                          name: 'آل مسلم',
                                                                                                          fatherName: 'آل علي',
                                                                                                          locked: false,
                                                                                                          primary: true,
                                                                                                          category: 'branch',
                                                                                                          generation: 27,
                                                                                                          children: [
                                                                                                            { id: 'al-muslim-al-barah', name: 'آل باراح', locked: true, children: [] },
                                                                                                            { id: 'al-muslim-al-bawzayfah', name: 'آل باوزيفة', locked: true, children: [] },
                                                                                                            { id: 'al-muslim-al-awn', name: 'آل عون', locked: true, children: [] },
                                                                                                            {
                                                                                                              id: 'al-muslim-al-baqi',
                                                                                                              name: 'آل باقي',
                                                                                                              fatherName: 'آل مسلم',
                                                                                                              locked: false,
                                                                                                              primary: true,
                                                                                                              category: 'branch',
                                                                                                              generation: 28,
                                                                                                              children: [
                                                                                                                { id: 'al-baqi-al-anaq', name: 'العنق', locked: true, children: [] },
                                                                                                                {
                                                                                                                  id: 'al-baqi-al-huwaydhiq',
                                                                                                                  name: 'آل حويذق',
                                                                                                                  fatherName: 'آل باقي',
                                                                                                                  locked: false,
                                                                                                                  primary: true,
                                                                                                                  category: 'branch',
                                                                                                                  generation: 29,
                                                                                                                  children: [
                                                                                                                    { id: 'al-huwaydhiq-al-haydara', name: 'آل حيدرة', locked: true, children: [] },
                                                                                                                    {
                                                                                                                      id: 'al-huwaydhiq-al-harr',
                                                                                                                      name: 'الهر',
                                                                                                                      fatherName: 'آل حويذق',
                                                                                                                      locked: false,
                                                                                                                      primary: true,
                                                                                                                      category: 'branch',
                                                                                                                      generation: 30,
                                                                                                                      children: [
                                                                                                                        { id: 'al-harr-masfer', name: 'مسفر', locked: true, children: [] },
                                                                                                                        {
                                                                                                                          id: 'al-harr-ajim',
                                                                                                                          name: 'عجيم',
                                                                                                                          fatherName: 'الهر',
                                                                                                                          locked: false,
                                                                                                                          primary: true,
                                                                                                                          category: 'person',
                                                                                                                          generation: 31,
                                                                                                                          children: [
                                                                                                                            { id: 'ajim-mohammed', name: 'محمد', fatherName: 'عجيم', locked: true, children: [] },
                                                                                                                            {
                                                                                                                              id: 'ajim-ali',
                                                                                                                              name: 'علي',
                                                                                                                              fatherName: 'عجيم',
                                                                                                                              locked: false,
                                                                                                                              primary: true,
                                                                                                                              category: 'person',
                                                                                                                              generation: 32,
                                                                                                                              children: [
                                                                                                                                { id: 'ali-nukhayran', name: 'نخيران', locked: true, children: [] },
                                                                                                                                { id: 'ali-muslim-habran', name: 'مسلم (حبران)', locked: true, children: [] },
                                                                                                                                {
                                                                                                                                  id: 'ali-yaslam',
                                                                                                                                  name: 'يسلم',
                                                                                                                                  fatherName: 'علي بن عجيم',
                                                                                                                                  locked: false,
                                                                                                                                  primary: true,
                                                                                                                                  category: 'person',
                                                                                                                                  generation: 33,
                                                                                                                                  children: [
                                                                                                                                    { id: 'yaslam-salem', name: 'سالم', fatherName: 'يسلم', locked: true, children: [] },
                                                                                                                                    { id: 'yaslam-yaslam', name: 'يسلم', fatherName: 'يسلم', locked: true, children: [] },
                                                                                                                                    {
                                                                                                                                      id: 'yaslam-awad',
                                                                                                                                      name: 'عوض',
                                                                                                                                      fatherName: 'يسلم بن علي',
                                                                                                                                      locked: false,
                                                                                                                                      primary: true,
                                                                                                                                      category: 'person',
                                                                                                                                      generation: 34,
                                                                                                                                      children: [
                                                                                                                                        { id: 'awad-mohsen', name: 'محسن', locked: true, children: [] },
                                                                                                                                        {
                                                                                                                                          id: 'awad-marai',
                                                                                                                                          name: 'مرعي',
                                                                                                                                          fatherName: 'عوض بن يسلم',
                                                                                                                                          locked: false,
                                                                                                                                          primary: true,
                                                                                                                                          category: 'person',
                                                                                                                                          generation: 35,
                                                                                                                                          children: [
                                                                                                                                            { id: 'marai-ahmed', name: 'أحمد', locked: true, children: [] },
                                                                                                                                            { id: 'marai-awad', name: 'عوض', fatherName: 'مرعي', locked: true, children: [] },
                                                                                                                                            {
                                                                                                                                              id: 'marai-salem',
                                                                                                                                              name: 'سالم',
                                                                                                                                              subtitle: 'آل سالم',
                                                                                                                                              fatherName: 'مرعي بن عوض',
                                                                                                                                              locked: false,
                                                                                                                                              primary: true,
                                                                                                                                              category: 'family',
                                                                                                                                              generation: 36,
                                                                                                                                              children: [
                                                                                                                                                {
                                                                                                                                                  id: 'salem-khalid',
                                                                                                                                                  name: 'خالد',
                                                                                                                                                  badge: 'الأكبر',
                                                                                                                                                  fatherName: 'سالم بن مرعي',
                                                                                                                                                  locked: false,
                                                                                                                                                  terminal: true,
                                                                                                                                                  category: 'person',
                                                                                                                                                  generation: 37,
                                                                                                                                                  children: []
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                  id: 'salem-mohammed',
                                                                                                                                                  name: 'محمد',
                                                                                                                                                  fatherName: 'سالم بن مرعي',
                                                                                                                                                  locked: false,
                                                                                                                                                  terminal: true,
                                                                                                                                                  category: 'person',
                                                                                                                                                  generation: 37,
                                                                                                                                                  children: []
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                  id: 'salem-abdullah',
                                                                                                                                                  name: 'عبدالله',
                                                                                                                                                  fatherName: 'سالم بن مرعي',
                                                                                                                                                  locked: false,
                                                                                                                                                  terminal: true,
                                                                                                                                                  category: 'person',
                                                                                                                                                  generation: 37,
                                                                                                                                                  children: []
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                  id: 'salem-sultan',
                                                                                                                                                  name: 'سلطان',
                                                                                                                                                  fatherName: 'سالم بن مرعي',
                                                                                                                                                  locked: false,
                                                                                                                                                  terminal: true,
                                                                                                                                                  category: 'person',
                                                                                                                                                  generation: 37,
                                                                                                                                                  children: []
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                  id: 'salem-saeed',
                                                                                                                                                  name: 'سعيد',
                                                                                                                                                  fatherName: 'سالم بن مرعي',
                                                                                                                                                  locked: false,
                                                                                                                                                  terminal: true,
                                                                                                                                                  category: 'person',
                                                                                                                                                  generation: 37,
                                                                                                                                                  children: []
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                  id: 'salem-sayf',
                                                                                                                                                  name: 'سيف',
                                                                                                                                                  fatherName: 'سالم بن مرعي',
                                                                                                                                                  locked: false,
                                                                                                                                                  terminal: true,
                                                                                                                                                  category: 'person',
                                                                                                                                                  generation: 37,
                                                                                                                                                  children: []
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                  id: 'salem-hamdan',
                                                                                                                                                  name: 'حمدان',
                                                                                                                                                  fatherName: 'سالم بن مرعي',
                                                                                                                                                  locked: false,
                                                                                                                                                  terminal: true,
                                                                                                                                                  category: 'person',
                                                                                                                                                  generation: 37,
                                                                                                                                                  children: []
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                  id: 'salem-zayed',
                                                                                                                                                  name: 'زايد',
                                                                                                                                                  fatherName: 'سالم بن مرعي',
                                                                                                                                                  locked: false,
                                                                                                                                                  terminal: true,
                                                                                                                                                  category: 'person',
                                                                                                                                                  generation: 37,
                                                                                                                                                  children: []
                                                                                                                                                }
                                                                                                                                              ]
                                                                                                                                            }
                                                                                                                                          ]
                                                                                                                                        }
                                                                                                                                      ]
                                                                                                                                    }
                                                                                                                                  ]
                                                                                                                                }
                                                                                                                              ]
                                                                                                                            }
                                                                                                                          ]
                                                                                                                        }
                                                                                                                      ]
                                                                                                                    }
                                                                                                                  ]
                                                                                                                }
                                                                                                              ]
                                                                                                            }
                                                                                                          ]
                                                                                                        }
                                                                                                      ]
                                                                                                    }
                                                                                                  ]
                                                                                                }
                                                                                              ]
                                                                                            }
                                                                                          ]
                                                                                        }
                                                                                      ]
                                                                                    }
                                                                                  ]
                                                                                }
                                                                              ]
                                                                            }
                                                                          ]
                                                                        }
                                                                      ]
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        { id: 'saba-humayr', name: 'العرنجج — حمير', locked: true, children: [] },
                        { id: 'saba-zaydan', name: 'زيدان', locked: true, children: [] },
                        { id: 'saba-abdullah', name: 'عبدالله', locked: true, children: [] },
                        { id: 'saba-alnuman', name: 'النعمان', locked: true, children: [] },
                        { id: 'saba-almawloud', name: 'المولود', locked: true, children: [] },
                        { id: 'saba-yashjub-locked', name: 'يشجب', locked: true, children: [] },
                        { id: 'saba-ruhum', name: 'رهم', locked: true, children: [] },
                        { id: 'saba-shaddad', name: 'شداد', locked: true, children: [] },
                        { id: 'saba-rabiah', name: 'ربيعة', locked: true, children: [] }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Array of Salem's direct path IDs from Qahtan to Salem
export const salemPathIds: string[] = [
  'qahtan',
  'qahtan-harith',
  'harith-yarub',
  'yarub-yashjub',
  'yashjub-saba',
  'saba-kahlan',
  'kahlan-zayd',
  'zayd-urayb',
  'urayb-amr',
  'amr-zayd',
  'zayd-udad',
  'udad-murra',
  'murra-harith',
  'harith-adi',
  'adi-ufayr',
  'ufayr-kindi',
  'kindi-muawiya',
  'muawiya-muratta',
  'muratta-malik-as-sadaf',
  'malik-as-sadafi',
  'sadafi-khuraym',
  'khuraym-malik',
  'malik-alashmoos',
  'alashmoos-sayaar',
  'sayaar-layth',
  'layth-al-ali',
  'al-ali-al-muslim',
  'al-muslim-al-baqi',
  'al-baqi-al-huwaydhiq',
  'al-huwaydhiq-al-harr',
  'al-harr-ajim',
  'ajim-ali',
  'ali-yaslam',
  'yaslam-awad',
  'awad-marai',
  'marai-salem'
];

// Helper: Normalize Arabic string for tolerant search
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    // Remove diacritics / tashkeel
    .replace(/[\u064B-\u0652\u0670]/g, '')
    // Normalize alefs
    .replace(/[إأآا]/g, 'ا')
    // Normalize taa marbuta
    .replace(/ة/g, 'ه')
    // Normalize yaa
    .replace(/[يى]/g, 'ي')
    // Remove tatweel / kashida
    .replace(/\u0640/g, '')
    // Remove extra spaces & trim
    .trim()
    .toLowerCase();
}

// Helper: Find node by ID
export function findNodeById(root: GenealogyNode, id: string): GenealogyNode | null {
  if (root.id === id) return root;
  for (const child of root.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}

// Helper: Get ancestry path of nodes leading to targetId
export function getNodeAncestryPath(root: GenealogyNode, targetId: string): GenealogyNode[] | null {
  if (root.id === targetId) return [root];
  for (const child of root.children) {
    const subPath = getNodeAncestryPath(child, targetId);
    if (subPath) return [root, ...subPath];
  }
  return null;
}

// Flatten all nodes with full contextual breadcrumbs for search
export type FlatGenealogyItem = {
  node: GenealogyNode;
  pathNames: string[];
  contextLabel: string;
};

export function flattenGenealogyTree(
  node: GenealogyNode = genealogyTree,
  parentNames: string[] = []
): FlatGenealogyItem[] {
  const currentPath = [...parentNames, node.name];
  const context = parentNames.length > 0 
    ? `${node.name} (ابن ${parentNames[parentNames.length - 1]})`
    : node.name;

  const current: FlatGenealogyItem = {
    node,
    pathNames: currentPath,
    contextLabel: context
  };

  let list = [current];
  for (const child of node.children) {
    list = list.concat(flattenGenealogyTree(child, currentPath));
  }
  return list;
}

// Formatted Lineage String from ancestors
export function buildLineageString(path: GenealogyNode[]): string {
  // Ordered from child to oldest ancestor, e.g. سالم بن مرعي بن عوض ... بن قحطان
  const names = [...path].reverse().map(n => n.name.split('—')[0].trim());
  return names.join(' بن ');
}
