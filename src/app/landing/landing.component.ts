import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
// if you want to save the docx file, you need import 'file-saver'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { Observable, of } from 'rxjs';

interface Country {
  code: string;
  name: string;
}

interface City {
  code: string | number;
  name: string;
  department: string;
  country: Country;
}

interface Certification {
  instution: string;
  title: string;
  description?: string;
  url?: string;
  fromDate: Date;
  toDate: Date;
  city: City;
  reference?: string;
}

interface Skill {
  name: string;
  fromYear: number;
  toYear: number;
  percentage: number;
}

interface Network {
  title: string;
  url: string;
  icon: string;
}

interface Project {
  title: string;
  url: string;
  description: string;
}

interface Reference {
  type: 'personal' | 'job' | 'familiar';
  name: string;
  description: string;
  phone?: number;
  email?: string;
}

interface Profile {
  name: string;
  photo: string;
  title: string;
  workStartYear: number;
  birthdate: Date;
  age: number;
  cityBirth: City;
  yearsExperience: number;
  cityResidence: City;
  placeResidence?: string;
  phones?: {
    label: string;
    number: number;
  }[];
  email: string;
  skills: Skill[];
  studies: Certification[];
  jobs: Certification[];
  projects: Project[];
  references: Reference[];
  networks: Network[];
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @ViewChild('htmlPDF', { static: true }) htmlPDF: ElementRef;
  profile: Profile;
  currentDate: Date = new Date();
  loading: Observable<boolean>;

  constructor() {
    const COUNTRIES_MOCK: Country[] = [
      {
        code: 'CO',
        name: 'Colombia',
      },
    ];
    const CITIES_MOCK: City[] = [
      {
        code: 11,
        name: 'Bogotá D.C.',
        department: 'Bogotá',
        country: COUNTRIES_MOCK[0],
      },
      {
        code: 73,
        name: 'Ibagué',
        department: 'Tolima',
        country: COUNTRIES_MOCK[0],
      },
    ];

    const profile: Profile = {
      name: 'Eduard Ramírez',
      title: 'Desarrollador de software',
      photo: '/assets/personal-photo.svg',
      workStartYear: 2007,
      birthdate: new Date('June 15, 1989 01:15:00'),
      age: 0,
      cityBirth: CITIES_MOCK[1],
      yearsExperience: 0,
      cityResidence: CITIES_MOCK[0],
      phones: [
        {
          label: 'Personal',
          number: 573508119464,
        },
        {
          label: 'Hogar',
          number: 570314703904,
        },
      ],
      email: 'tantaroth@gmail.com',
      networks: [
        {
          title: 'LinkedIn',
          url: 'https://linkedin.com/in/tantaroth',
          icon: 'linkedin',
        },
        {
          title: 'GitHub',
          url: 'https://github.com/tantaroth',
          icon: 'github',
        },
      ],
      studies: [
        {
          instution: 'SENA (Regional Tolima)',
          fromDate: new Date('November 14, 2005 00:00:00'),
          toDate: new Date('October 26, 2007 00:00:00'),
          title: 'Análisis y desarrollo de sistemas de información',
          city: CITIES_MOCK[1],
        },
        {
          instution: 'SENA (Virtual)',
          fromDate: new Date('October 02, 2008 00:00:00'),
          toDate: new Date('November 18, 2008 00:00:00'),
          title: 'LINUX: Sistema operativo, comandos y utilidad',
          city: CITIES_MOCK[0],
        },
        {
          instution: 'Udemy (Virtual)',
          fromDate: new Date('February 05, 2019 00:00:00'),
          toDate: new Date('March 30, 2019 00:00:00'),
          title: 'Angular: De cero a experto',
          city: CITIES_MOCK[0],
        },
      ],
      projects: [
        {
          title: 'AfroUp',
          description: 'Plataforma web activista de la cultura afro',
          url: 'https://afroup.com',
        },
        {
          title: 'Takto Internacional',
          description: 'Plataforma web de multinivel',
          url: 'https://taktoint.com',
        },
      ],
      references: [
        {
          name: 'Jenniffer Mayren Urrutia Briñez',
          description: 'Publicista Internacional',
          phone: 570314703804,
          type: 'familiar',
        },
        {
          name: 'Néstor Marín Cruz',
          description: 'Ingeniero de software',
          phone: 573002216591,
          type: 'personal',
        },
        {
          name: 'Julian Gaviria Valencia',
          description:
            'Tecnólogo (Análisis y Desarrollo de Sistemas de Información)',
          phone: 573112415944,
          type: 'job',
        },
      ],
      jobs: [
        {
          instution: 'INSOFTAR',
          fromDate: new Date('December 18, 2020 00:00:00'),
          toDate: new Date(),
          title: 'Full Stack Developer',
          description: `
          (NodeJS, Angular). Desarrollo y mantenimiento de de sitio web de clientes ciencuadras.com
          <ul>
            <li>Desarrollo de angular sobre la plataforma del cliente</li>
            <li>Desarrollo de la api sobre api con el framework de swagger</li>
            <li>Desarrollo de las pruebas unitarias sobre jest en angular</li>
            <li>Organización sobre la metodología SCRUM usando la herramienta JIRA</li>
            <li>Ejecución de las pruebas unitarias sobre sonar</li>
          </ul>
          `,
          url: 'insoftar.com',
          city: CITIES_MOCK[0],
        },
        {
          instution: 'Accenture',
          fromDate: new Date('November 5, 2019 00:00:00'),
          toDate: new Date('June 10, 2020 00:00:00'),
          title: 'Application Development Senior Analyst',
          description: `
            (NodeJS, Angular, IONIC, AWS, Firebase). Desarrollo y mantenimiento de sitios web y aplicaciones móviles para clientes de la firma.
            <ul>
              <li>Desarrollo de angular e IONIC sobre la plataforma del cliente</li>
              <li>Implementación de la librería AR.js y mapbox para juego de uno de los clientes de la empresa</li>
              <li>Desarrollo de las pruebas unitarias sobre jest en angular</li>
              <li>Organización sobre la metodología SCRUM usando la herramienta JIRA</li>
              <li>Ejecución de las pruebas unitarias sobre sonar</li>
            </ul>
            `,
          url: 'accenture.com',
          city: CITIES_MOCK[0],
        },
        {
          instution: 'INSOFTAR',
          fromDate: new Date('Febrary 05, 2019 00:00:00'),
          toDate: new Date('October 01, 2019 00:00:00'),
          title: 'Full Stack Developer',
          description: `
            (NodeJS, Angular, ElasticSearch, Laravel). Desarrollo y mantenimiento de de sitio web de clientes ciencuadras.com
            <ul>
              <li>Desarrollo de angular y laravel sobre la plataforma del cliente</li>
              <li>Implementación de la matterport y pannellum para juego de uno de los clientes de la empresa</li>
              <li>Desarrollo de las pruebas unitarias sobre jest en angular</li>
              <li>Organización sobre la metodología SCRUM usando la herramienta JIRA</li>
              <li>Se crean indices para traer los inmuebles del proyecto</li>
              <li>Ejecución de las pruebas unitarias sobre sonar</li>
            </ul>
            `,
          url: 'insoftar.com',
          city: CITIES_MOCK[0],
        },
        {
          instution: 'Teravision Technologies',
          fromDate: new Date('April 18, 2018 00:00:00'),
          toDate: new Date('December 21, 2018 00:00:00'),
          title: 'Semi-Senior Full Stack',
          description: `
            (NodeJS, Angular, MongoDB, IONIC). Desarrollo de aplicaciones móviles híbridas y web.
            <ul>
              <li>Desarrollo de angular sobre la plataforma del cliente</li>
              <li>Desarrollo de la api sobre api con el framework de swagger</li>
              <li>Desarrollo de las pruebas unitarias sobre jest en angular</li>
              <li>Organización sobre la metodología SCRUM usando la herramienta JIRA</li>
            </ul>
            `,
          url: 'teravisiontech.com',
          city: CITIES_MOCK[0],
          reference: 'Yuleika Carrero, ycarrero@teravisiontech.com - 756 9959',
        },
        {
          instution: 'FITPAL',
          fromDate: new Date('November 7, 2017 00:00:00'),
          toDate: new Date('March 12, 2018 00:00:00'),
          title: 'Web Developer',
          description: `
            (NodeJS, Angular, PostgreSQL, SequelizeJS). Desarrollo de aplicación para administrar gimnasios.
            <ul>
              <li>Desarrollo de angular sobre la plataforma del cliente</li>
              <li>Organización sobre la metodología SCRUM usando la herramienta JIRA</li>
            </ul>
            `,
          url: 'checklemon.com',
          city: CITIES_MOCK[0],
          reference: 'Edwin Fuentes Amin, 300 871 8408',
        },
        {
          instution: 'GYFFU S.A.S',
          fromDate: new Date('November 7, 2017 00:00:00'),
          toDate: new Date('March 12, 2018 00:00:00'),
          title: 'Web & App (Chrome) Developer',
          description:
            '(HTML5, CSS3, Jquery, VueJS, PHP, Elastic Search, MySQL, Apache Cordova). Desarrollo de módulo administrativo del buscador de Gyffu, mantenimiento al buscador de Gyffu, soporte al servidor de Amazon.',
          url: 'gyffu.com',
          city: CITIES_MOCK[0],
          reference: 'Sebastian Henao, sebas@gyffu.com',
        },
        {
          instution: 'VISION MOBILE',
          fromDate: new Date('November 7, 2017 00:00:00'),
          toDate: new Date('March 12, 2018 00:00:00'),
          title: 'Web & Mobile Developer',
          description:
            '(HTML5, CS3, Jquery, AngularJS, PHP, Firebase, MySQL, Apache Cordova). Acompañamiento y desarrollo en la parte web y mobile de ‘Icare Web‘ (Mi Doctor) y desarrollo de Publiflash Primera Fase.',
          url: 'visionmobile.co',
          city: CITIES_MOCK[0],
          reference: 'Juan Fernando Seamaán, jfseamaan@visionmobile.co',
        },
      ],
      skills: [
        {
          name: 'HTML',
          fromYear: 2007,
          toYear: new Date().getFullYear(),
          percentage: 90,
        },
        {
          name: 'javascript',
          fromYear: 2008,
          toYear: new Date().getFullYear(),
          percentage: 90,
        },
        {
          name: 'MySQL',
          fromYear: 2007,
          toYear: new Date().getFullYear(),
          percentage: 90,
        },
        {
          name: 'Linux Server',
          fromYear: 2009,
          toYear: new Date().getFullYear(),
          percentage: 90,
        },
        {
          name: 'Node JS',
          fromYear: 2017,
          toYear: new Date().getFullYear(),
          percentage: 80,
        },
        {
          name: 'angular',
          fromYear: 2017,
          toYear: new Date().getFullYear(),
          percentage: 80,
        },
        {
          name: 'UIkit 3',
          fromYear: 2017,
          toYear: new Date().getFullYear(),
          percentage: 90,
        },
        {
          name: 'algolia',
          fromYear: 2018,
          toYear: new Date().getFullYear(),
          percentage: 90,
        },
        {
          name: 'firebase',
          fromYear: 2014,
          toYear: new Date().getFullYear(),
          percentage: 80,
        },
        {
          name: 'firebase firestore',
          fromYear: 2017,
          toYear: new Date().getFullYear(),
          percentage: 80,
        },
        {
          name: 'firebase authentication',
          fromYear: 2017,
          toYear: new Date().getFullYear(),
          percentage: 90,
        },
        {
          name: 'firebase hosting',
          fromYear: 2017,
          toYear: new Date().getFullYear(),
          percentage: 90,
        },
        {
          name: 'firebase storage',
          fromYear: 2018,
          toYear: new Date().getFullYear(),
          percentage: 70,
        },
        {
          name: 'firebase functions',
          fromYear: 2018,
          toYear: new Date().getFullYear(),
          percentage: 70,
        },
        {
          name: 'firebase functions',
          fromYear: 2018,
          toYear: new Date().getFullYear(),
          percentage: 70,
        },
        {
          name: 'angular material',
          fromYear: 2018,
          toYear: new Date().getFullYear(),
          percentage: 70,
        },
        {
          name: 'SASS',
          fromYear: 2018,
          toYear: new Date().getFullYear(),
          percentage: 60,
        },
        {
          name: 'RXJS',
          fromYear: 2019,
          toYear: new Date().getFullYear(),
          percentage: 70,
        },
        {
          name: 'IONIC',
          fromYear: 2018,
          toYear: new Date().getFullYear(),
          percentage: 70,
        },
        {
          name: 'jQuery or cash-dom',
          fromYear: 2008,
          toYear: new Date().getFullYear(),
          percentage: 90,
        },
        {
          name: 'PHP',
          fromYear: 2007,
          toYear: 2014,
          percentage: 70,
        },
        {
          name: 'angular JS',
          fromYear: 2014,
          toYear: 2015,
          percentage: 40,
        },
        {
          name: 'Vue JS',
          fromYear: 2018,
          toYear: 2019,
          percentage: 50,
        },
      ],
    };

    profile.age = new Date().getFullYear() - profile.birthdate.getFullYear();
    profile.yearsExperience = new Date().getFullYear() - profile.workStartYear;

    this.profile = profile;
  }

  ngOnInit(): void {}

  oldPDF(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.loading = of(true);

    const node: HTMLElement = this.htmlPDF.nativeElement;

    html2canvas(node).then((canvas) => {
      let pdf: jsPDF = new jsPDF('p', 'mm');

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      var position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Eduard Ramirez - CV.pdf');

      this.loading = of(false);
    });
  }

  pdf(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.loading = of(true);

    const node: HTMLElement = this.htmlPDF.nativeElement;

    var html = htmlToPdfmake(node.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    this.loading = of(false);

    // HTMLToDocx(node.innerHTML).then(data => {
    //   console.log(data)
    //   saveAs(data, 'file2.docx');
    // })
    // asBlob(node.innerHTML).then((data) => {
    //   console.log('>> data', data)
    //   saveAs(data, 'file.docx'); // save as docx file
    // }); // asBlob() return Promise<Blob|Buffer>

    // html2canvas(node).then((canvas) => {
    //   let pdf: jsPDF = new jsPDF('p', 'mm');

    //   const imgWidth = 210;
    //   const pageHeight = 295;
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

    //   let heightLeft = imgHeight;
    //   const imgData = canvas.toDataURL('image/jpeg', 1.0);

    //   var position = 0;

    //   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //   heightLeft -= pageHeight;

    //   while (heightLeft >= 0) {
    //     position = heightLeft - imgHeight;
    //     pdf.addPage();
    //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //     heightLeft -= pageHeight;
    //   }

    //   pdf.save('Eduard Ramirez - CV.pdf');

    //   this.loading = of(false);
    // });
  }

  phonesTrackBy(index: number): number {
    return index;
  }
  skillsTrackBy(index: number): number {
    return index;
  }
  studiesTrackBy(index: number): number {
    return index;
  }
  jobsTrackBy(index: number): number {
    return index;
  }
  referencesTrackBy(index: number): number {
    return index;
  }
  projectsTrackBy(index: number): number {
    return index;
  }
}
