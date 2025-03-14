import { type PagebuilderType } from "@/types";
import { Form } from "../contact-me/form";
import { Parallax } from "../parallax";
import { Email, Facebook, HeadlineFlower, Instagram } from "../icons";
import Whatsapp from "../icons/social/Whatsapp";
import { cn } from "@workspace/ui/lib/utils";
import { getImageUrl } from "../sanity-image";

type ContactFormProps = PagebuilderType<"contactForm">;
type CommonProps = {
  children: React.ReactNode;
  className?: string;
};
const ContactHeading = ({ children, className }: CommonProps) => (
  <h2 className={cn("text-2xl font-accent text-foreground-heading", className)}>
    {children}
  </h2>
);

const ContactList = ({ children, className }: CommonProps) => (
  <ul className={cn("flex flex-col gap-2 text-lg", className)}>{children}</ul>
);

const ContactContainer = ({ children, className }: CommonProps) => (
  <div className={cn("px-6", className)}>{children}</div>
);

export function ContactForm({ image }: ContactFormProps) {
  const parallaxImage = getImageUrl(image);

  return (
    <section id="contactForm" className="bg-bakc">
      <div className="container py-16">
        <div>
          <div className="flex justify-center mb-5">
            <HeadlineFlower aria-hidden={true} />
          </div>
          <h1 className="heading text-center mb-4">Contact me</h1>
          <p className="body-text text-center max-w-[36ch] mx-auto">
            Want to learn more? Please reach me out!
          </p>
        </div>
      </div>
      <div className="relative">
        <Parallax parallaxImage={parallaxImage}>
          <div className="container section">
            <div className="w-full max-w-5xl bg-white mx-auto grid lg:gap-x-4 lg:grid-cols-[auto_1fr]">
              <ContactContainer className="flex flex-col gap-6 lg:self-start pt-16 pb-8 md:pb-16 px-6 lg:h-full bg-background-secondary lg:pt-8">
                <div className="contact-container-inner">
                  <ContactHeading className="mb-4 sm:text-center lg:text-start">
                    Find me online
                  </ContactHeading>
                  <ContactList className="sm:flex-row sm:justify-center sm:gap-6 lg:justify-start lg:flex-col lg:gap-2">
                    <li>
                      <a
                        className="flex gap-2 items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow me on Instagram"
                        href="https://www.instagram.com/cornelia_berendeev/"
                      >
                        <Instagram />
                        <span>Instagram</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex gap-2 items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow me on Facebook"
                        href="https://www.facebook.com/profile.php?id=100094781710186"
                      >
                        <Facebook />
                        <span>Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex gap-2 items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Contact me on Whatsapp"
                        href="https://wa.me/+353894938067"
                      >
                        <Whatsapp />
                        <span>Whatsapp</span>
                      </a>
                    </li>
                  </ContactList>
                </div>
                <div className="contact-container-inner">
                  <ContactHeading className="mb-4 sm:text-center lg:text-start">
                    Email me
                  </ContactHeading>
                  <ContactList className="sm:flex-row sm:justify-center sm:gap-6 lg:justify-start lg:flex-col lg:gap-2">
                    <li>
                      <a
                        className="flex gap-2 items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Contact me on Whatsapp"
                        href="mailto:cornelia.berendeev@gmail.com"
                      >
                        <Email />
                        <span>cornelia.berendeev@gmail.com</span>
                      </a>
                    </li>
                  </ContactList>
                </div>
              </ContactContainer>
              <ContactContainer className="pt-8 pb-16 ">
                <ContactHeading className="mb-6 sm:text-center lg:text-start">
                  Or use the contact form
                </ContactHeading>
                <Form className="md:px-10 md:max-w-[39rem] md:mx-auto lg:px-0" />
              </ContactContainer>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
