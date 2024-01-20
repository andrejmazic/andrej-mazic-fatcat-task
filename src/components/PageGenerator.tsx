import clsx from 'clsx';
import {Hero, HeroProps} from './Hero';
import {ItemsShowcase, ItemsShowcaseProps} from './ItemsShowcase';
import {PanelShowcase, PanelShowcaseProps} from './PanelShowcase';
import {TrustBar, TrustBarProps} from './TrustBar';
import ContactUsForm from './ContactUsForm';

type Components = 'Hero' | 'ItemsShowcase' | 'PanelShowcase' | 'TrustBar' | 'ContactUsForm';

type ComponentType = {
    type: Components;
    props: Record<string, any>;
}

type LayoutSection = {
    type: 'layoutSection';
    props: string[];
    components: ComponentType[];
    title?: string;
}

export type Section = LayoutSection;

export type PageGeneratorProps = {
    title?: string;
    data: Section[];
}

const PageGenerator = ({title, data}: PageGeneratorProps) => {
    return (
        <div className={clsx(
            'flex',
            'flex-col',
            'items-center',
            'gap-4',
            'pt-4'
        )}>
            <h1 className={clsx(
                'text-4xl',
                'font-bold'
            )}>{title}</h1>
            {data.map((section, sectionIndex) => {
                const {type: sectionType, props: sectionProps, components, title} = section;
                const sectionComponents = components.map((component, componentIndex) => {
                    const {type: componentType, props: componentProps} = component;

                    switch (componentType) {
                        case 'Hero':
                            return <Hero key={componentIndex} {...componentProps as HeroProps} />;
                        case 'ItemsShowcase':
                            return <ItemsShowcase key={componentIndex} {...componentProps as ItemsShowcaseProps} />;
                        case 'PanelShowcase':
                            return <PanelShowcase key={componentIndex} {...componentProps as PanelShowcaseProps} />;
                        case 'TrustBar':
                            return <TrustBar key={componentIndex} {...componentProps as TrustBarProps} />;
                        case 'ContactUsForm':
                            return <ContactUsForm key={componentIndex} {...componentProps} />;
                        default:
                            return null;
                    }
                })

                switch (sectionType) {
                    case 'layoutSection':
                        return (
                            <section key={sectionIndex} className={clsx(...sectionProps)}>
                                <h1 className={clsx(
                                    'text-3xl',
                                    'font-bold',
                                    'self-center'
                                )}>{title}</h1>
                                {sectionComponents}
                            </section>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    )
}

export default PageGenerator;