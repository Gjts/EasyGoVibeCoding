"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clock3, Eye, LoaderCircle, Users } from "lucide-react";

const navigation = {
  courses: [
    { name: "基础篇", href: "/basics", gradient: "from-blue-400 to-cyan-400" },
    {
      name: "进阶篇",
      href: "/advanced",
      gradient: "from-emerald-400 to-green-400",
    },
    {
      name: "工具篇",
      href: "/tools",
      gradient: "from-orange-400 to-amber-400",
    },
    {
      name: "架构篇",
      href: "/architecture",
      gradient: "from-indigo-400 to-purple-400",
    },
    { name: "实践篇", href: "/practice", gradient: "from-red-400 to-rose-400" },
    {
      name: "团队篇",
      href: "/team",
      gradient: "from-green-400 to-emerald-400",
    },
  ],
  resources: [
    { name: "生态导航", href: "/ecosystem" },
    { name: "优质资源", href: "/resources" },
    { name: "更新日志", href: "#" },
    { name: "关于我们", href: "#" },
  ],
  tools: [
    { name: "Cursor", href: "#" },
    { name: "GitHub Copilot", href: "#" },
    { name: "Claude Code", href: "#" },
    { name: "Fabric", href: "#" },
  ],
};

const LAUNCH_DATE = new Date("2026-01-15T22:47:55+08:00");

interface SiteStatsData {
  pageViews: number | null;
  visitors: number | null;
}

export function Footer() {
  const [runningTime, setRunningTime] = useState("");
  const [statsData, setStatsData] = useState<SiteStatsData>({
    pageViews: null,
    visitors: null,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const updateRunningTime = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - LAUNCH_DATE.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRunningTime(`${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`);
    };

    updateRunningTime();
    const timer = window.setInterval(updateRunningTime, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchSiteStats = async () => {
      try {
        setStatsLoading(true);

        const path = window.location.pathname || "/";

        const trackResponse = await fetch("/api/site-stats", {
          method: "POST",
          cache: "no-store",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path }),
        });

        let result: {
          success?: boolean;
          data?: {
            pageViews?: number;
            visitors?: number;
          };
        } | null = null;

        if (trackResponse.ok) {
          result = (await trackResponse.json()) as {
            success?: boolean;
            data?: {
              pageViews?: number;
              visitors?: number;
            };
          };
        } else if (trackResponse.status !== 404) {
          const response = await fetch("/api/site-stats", {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          });

          if (response.ok) {
            result = (await response.json()) as {
              success?: boolean;
              data?: {
                pageViews?: number;
                visitors?: number;
              };
            };
          }
        }

        if (!cancelled) {
          setStatsData({
            pageViews:
              typeof result?.data?.pageViews === "number"
                ? result.data.pageViews
                : null,
            visitors:
              typeof result?.data?.visitors === "number"
                ? result.data.visitors
                : null,
          });
        }
      } catch {
        if (!cancelled) {
          setStatsData({
            pageViews: null,
            visitors: null,
          });
        }
      } finally {
        if (!cancelled) {
          setStatsLoading(false);
        }
      }
    };

    void fetchSiteStats();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        key: "views",
        label: "总访问量：",
        value:
          statsData.pageViews === null
            ? statsLoading
              ? "加载中"
              : "--"
            : statsData.pageViews.toLocaleString("zh-CN"),
        icon: Eye,
        iconClassName: "text-purple-500",
      },
      {
        key: "visitors",
        label: "访客数：",
        value:
          statsData.visitors === null
            ? statsLoading
              ? "加载中"
              : "--"
            : statsData.visitors.toLocaleString("zh-CN"),
        icon: Users,
        iconClassName: "text-pink-500",
      },
      {
        key: "runtime",
        label: "已运行：",
        value: runningTime || "--",
        icon: Clock3,
        iconClassName: "text-blue-500",
      },
    ],
    [runningTime, statsData, statsLoading],
  );

  return (
    <footer className="border-t-2 border-white/50 bg-white/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-gray-900">EasyGoVibeCoding</span>
            </div>
            <p className="text-sm text-gray-700 max-w-xs leading-relaxed font-medium">
              AI 编程工具不是魔法，是工程。理解机制才能驾驭工具。
            </p>
            <p className="text-xs text-gray-600 font-medium">
              版本 v1.0 | 最后更新：2025-01-26
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">课程</h3>
              <ul className="space-y-3">
                {navigation.courses.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-700 hover:text-purple-600 transition-colors font-medium flex items-center gap-2 group"
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">资源</h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-700 hover:text-purple-600 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">工具</h3>
              <ul className="space-y-3">
                {navigation.tools.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-700 hover:text-purple-600 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t-2 border-white/50 pt-8 space-y-6">
          <div className="rounded-3xl border-2 border-white/60 bg-white/70 backdrop-blur-md px-5 py-4 shadow-[0_8px_30px_0_rgba(255,255,255,0.35)]">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-700">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.key}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Icon className={`h-4 w-4 ${item.iconClassName}`} />
                    <span>{item.label}</span>
                    <span className="font-semibold text-gray-900 tabular-nums inline-flex items-center gap-1.5">
                      {statsLoading && item.key !== "runtime" ? (
                        <LoaderCircle className="h-3.5 w-3.5 animate-spin text-gray-500" />
                      ) : null}
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center font-medium">
            &copy; {new Date().getFullYear()} EasyGoVibeCoding. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
