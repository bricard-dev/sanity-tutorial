import { ControlsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: ControlsIcon,
  groups: [
    { name: 'generalSettings', title: 'Générale' },
    { name: 'headerSettings', title: 'Haut de page' },
  ],
  fields: [
    defineField({
      group: 'generalSettings',
      name: 'title',
      title: 'Titre du site',
      type: 'string',
      description: 'Le titre principal du site (utilisé dans les métadonnées)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: 'generalSettings',
      name: 'description',
      title: 'Description du site',
      type: 'text',
      description: 'La description du site (utilisée dans les métadonnées)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: 'generalSettings',
      name: 'homePage',
      type: 'reference',
      to: [{ type: 'page' }],
    }),
    defineField({
      group: 'headerSettings',
      name: 'headerDisplayType',
      title: "Type d'affichage",
      type: 'string',
      description: 'Choisissez comment afficher le titre dans le haut de page',
      options: {
        list: [
          { title: 'Titre du site', value: 'siteTitle' },
          { title: 'Titre personnalisé', value: 'customTitle' },
          { title: 'Logo (image)', value: 'logo' },
        ],
        layout: 'radio',
      },
      initialValue: 'siteTitle',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: 'headerSettings',
      name: 'headerCustomTitle',
      title: 'Titre personnalisé',
      type: 'string',
      description: 'Un titre différent à afficher dans le haut de page',
      hidden: ({ parent }) => parent?.headerDisplayType !== 'customTitle',
    }),
    defineField({
      group: 'headerSettings',
      name: 'headerLogo',
      title: 'Logo',
      type: 'image',
      description: 'Le logo à afficher dans le haut de page',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: "Description du logo pour l'accessibilité",
          validation: (Rule) => Rule.required(),
        }),
      ],
      hidden: ({ parent }) => parent?.headerDisplayType !== 'logo',
      validation: (Rule) =>
        Rule.custom((logo, context) => {
          const parent = context.parent as { headerDisplayType?: string };
          if (parent?.headerDisplayType === 'logo' && !logo) {
            return 'Le logo est requis quand le type d\'affichage est "Logo"';
          }
          return true;
        }),
    }),
    defineField({
      group: 'headerSettings',
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'élément de navigation',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'page' }],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
