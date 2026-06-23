"use client";

import { AutoSkeletonLoader } from "react-loadly";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, CheckCircle, XCircle, Star } from "lucide-react";

export const AutoSkeletonLoaderExamples = () => {
  const [isLoading, setIsLoading] = useState(true);
  const showCasesItems: Array<{
    title: string;
    note: string;
    component: React.ComponentProps<typeof AutoSkeletonLoader>["component"];
  }> = [
    {
      title: "UserCard baseline",
      note: "Plain function component, used as the control case.",
      component: (
        <UserCardFixExample
          name="Jane Doe"
          role="Product Designer"
          avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop"
        />
      ),
    },
    {
      title: "Photo with React.memo",
      note: "Memo wrapper unwraps into the real figure structure.",
      component: (
        <Photo
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&h=360&fit=crop"
          caption="Sunset at the lake"
        />
      ),
    },
    {
      title: "IconButton with forwardRef",
      note: "forwardRef unwraps into a button-sized skeleton.",
      component: (
        <IconButton icon={<Star className="size-4" />} label="Favorite" />
      ),
    },
    {
      title: "Avatar memo + forwardRef",
      note: "Nested wrappers resolve recursively.",
      component: (
        <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop" />
      ),
    },
    {
      title: "ProfileHeader custom hook",
      note: "Custom hook is detected and safely falls back to the profile preset.",
      component: <ProfileHeader />,
    },
    {
      title: "MetricsPanel class",
      note: "Class components stay skipped and use the dashboard preset.",
      component: <MetricsPanel label="Revenue" value="$48.2k" />,
    },
    {
      title: "APXWidget unmatched hook",
      note: "Unmatched names show the documented generic fallback ceiling.",
      component: <APXWidget />,
    },
    {
      title: "APX memo unmatched",
      note: "Memo unwrap allows real h3/span structure inference.",
      component: <APX title="Build #482" status="Passed" />,
    },
  ];

  return (
    <section
      id="playground"
      className="relative py-24 bg-background overflow-hidden border-t border-border/20"
    >
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <FlaskConical className="size-3.5" />
            <span>Experimental Feature</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AutoSkeletonLoader Experimental Playground
          </h2>
          <p className="mt-4 text-muted-foreground">
            AutoSkeletonLoader remains available for experimentation and
            backward compatibility. Results may vary depending on component
            structure. For production use, prefer SkeletonLoader and
            SkeletonGroupLoader.
          </p>
        </div>

        <Card className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md overflow-hidden">
          <CardHeader className="flex flex-col gap-4 border-b border-border/20 p-6 sm:flex-row sm:items-center sm:justify-between"></CardHeader>

          <Button
            onClick={() => setIsLoading((value) => !value)}
            className="mx-10 h-9 rounded-lg bg-indigo-400 px-4 text-xs font-semibold text-white hover:bg-indigo-500"
          >
            {isLoading ? "Reveal Content" : "Show Skeletons"}
          </Button>
          <CardContent className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
            {showCasesItems.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[210px] flex-col rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
              >
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    {item.note}
                  </p>
                </div>
                <div className="mt-auto rounded-lg border border-zinc-800/70 bg-zinc-900/40 p-4">
                  <AutoSkeletonLoader
                    inheritStyles
                    shimmer
                    loading={isLoading}
                    component={item.component}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* COMPARISON TABLE */}
        <div className="mt-20">
          <Card className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md overflow-hidden">
            <CardHeader className="p-6 border-b border-border/20">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <CheckCircle className="size-5 text-indigo-400" />
                AutoSkeletonLoader vs Manual Skeletons
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Comparing implementation complexity, code size, maintenance
                overhead, and rendering optimization.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-zinc-900/60 border-b border-border/20 text-muted-foreground font-semibold">
                    <th className="p-4 pl-6">Feature Details</th>
                    <th className="p-4 text-emerald-400 bg-emerald-500/5 border-x border-border/20">
                      AutoSkeletonLoader
                    </th>
                    <th className="p-4 pl-6 text-zinc-400">
                      Manual SkeletonLoader Coding
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">Code Complexity</td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" />
                        <span>Single Component Wrapper</span>
                      </div>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <XCircle className="size-4 text-rose-500 shrink-0" />
                        <span>
                          Write 50+ lines of raw Tailwind skeleton files
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">Styling Sync</td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <span>Automatic CSS inherit styling</span>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <span>
                        Manual margin/padding alignment synchronization
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">
                      Maintenance Overhead
                    </td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <span>Zero. Updates with component tree change</span>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <span>
                        High. Sync required when cards UI/styles update
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">
                      Performance Optimization
                    </td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <span>WeakMap Cache + CSS containment auto</span>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <span>
                        Manual rendering overrides, risk of layout shifts
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">
                      Responsive Behavior
                    </td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <span>Inherits breakpoints automatically</span>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <span>Duplicate responsive breakpoints in skeleton</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const UserCardFixExample = ({
  name,
  role,
  avatarUrl,
}: {
  name: string;
  role: string;
  avatarUrl: string;
}) => (
  <div className="flex w-full items-center gap-3">
    <img
      src={avatarUrl}
      alt={name}
      className="size-12 rounded-full object-cover"
    />
    <div>
      <p className="text-base font-semibold text-white">{name}</p>
      <span className="text-sm text-zinc-400">{role}</span>
    </div>
  </div>
);

const PhotoBase = ({ src, caption }: { src: string; caption: string }) => (
  <figure className="w-full">
    <img
      src={src}
      alt={caption}
      className="h-40 w-full rounded-xl object-cover"
    />
    <figcaption className="mt-3 text-sm text-zinc-300">{caption}</figcaption>
  </figure>
);
PhotoBase.displayName = "Photo";
const Photo = React.memo(PhotoBase);
Photo.displayName = "Photo";

const IconButtonBase = (
  { icon, label }: { icon: React.ReactNode; label: string },
  ref: React.Ref<HTMLButtonElement>,
) => (
  <button
    ref={ref}
    className="inline-flex h-10 w-[120px] items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 text-sm font-semibold text-white"
  >
    {icon}
    <span>{label}</span>
  </button>
);
IconButtonBase.displayName = "IconButton";
const IconButton = React.forwardRef(IconButtonBase);
IconButton.displayName = "IconButton";

const AvatarBase = (
  { src }: { src: string },
  ref: React.Ref<HTMLImageElement>,
) => (
  <img
    ref={ref}
    src={src}
    alt="Team member avatar"
    className="size-14 rounded-full object-cover"
  />
);
AvatarBase.displayName = "Avatar";
const Avatar = React.memo(React.forwardRef(AvatarBase));
Avatar.displayName = "Avatar";

function useAuthPreview() {
  return { user: { name: "Jane Doe", verified: true } };
}

function ProfileHeader() {
  const { user } = useAuthPreview();
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-white">{user.name}</span>
      {user.verified && <span className="text-emerald-400">Verified</span>}
    </div>
  );
}

class MetricsPanel extends React.Component<{ label: string; value: string }> {
  render() {
    return (
      <div className="w-full">
        <span className="text-xs text-zinc-500">{this.props.label}</span>
        <strong className="block text-2xl text-white">
          {this.props.value}
        </strong>
      </div>
    );
  }
}

function useApxTelemetry() {
  return { pulses: 3 };
}

function APXWidget() {
  const { pulses } = useApxTelemetry();
  return <div className="text-sm text-zinc-300">{pulses} pulses</div>;
}

const APXBase = ({ title, status }: { title: string; status: string }) => (
  <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3">
    <h3 className="text-base font-bold text-white">{title}</h3>
    <span className="text-sm text-emerald-400">{status}</span>
  </div>
);
APXBase.displayName = "APX";
const APX = React.memo(APXBase);
APX.displayName = "APX";
