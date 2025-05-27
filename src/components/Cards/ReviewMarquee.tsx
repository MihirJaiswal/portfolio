import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const reviews = [
  {
    name: "Mira Shah",
    username: "@mirashah",
    body: "Mihir's attention to detail is exceptional.",
    img: "https://avatar.vercel.sh/mira",
  },
  {
    name: "Arjun Dev",
    username: "@arjun_dev",
    body: "His coding skills and creativity are impressive.",
    img: "https://avatar.vercel.sh/arjun",
  },
  {
    name: "Sara Khan",
    username: "@sarak",
    body: "Mihir's work is always top-notch, and he's a great collaborator.",
    img: "https://avatar.vercel.sh/sara",
  },
  {
    name: "Rahul Mehta",
    username: "@rahulmehta",
    body: "Mihir’s knowledge of frontend frameworks and backend is solid.",
    img: "https://avatar.vercel.sh/rahul",
  },
  {
    name: "Nina Patel",
    username: "@ninapatel",
    body: "Highly recommend Mihir for any creative frontend work. ",
    img: "https://avatar.vercel.sh/nina",
  },
  {
    name: "Vikram Singh",
    username: "@vikrams",
    body: "Always a pleasure to work with Mihir.",
    img: "https://avatar.vercel.sh/vikram",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
      )}
    >
      <div className="flex flex-row items-center gap-2">

      </div>
      <blockquote className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-bold">{body}</blockquote>
    </figure>
  );
};

export function ReviewMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center gap-4 justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

 {/*      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div> */}
    </div>
  );
}
