import React from "react";
import { SkeletonLoaderTheme } from "../context/SkeletonGroupLoaderContext";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { SkeletonGroupLoader } from "../components/SkeletonGroupLoader";
import { spacing } from "../utils/spacing";

type SizeValue = number | string;

const themeKeys = ["animation", "speed", "baseColor", "highlightColor", "direction"] as const;

const pickTheme = (props: SkeletonLoaderTheme): SkeletonLoaderTheme =>
  themeKeys.reduce<SkeletonLoaderTheme>((theme, key) => {
    if (props[key] !== undefined) theme[key] = props[key] as never;
    return theme;
  }, {});

export interface CardSkeletonProps extends SkeletonLoaderTheme {
  hasMedia?: boolean;
  mediaHeight?: SizeValue;
  lines?: number;
  hasAvatar?: boolean;
  avatarSize?: number;
  hasActions?: boolean;
  actionCount?: number;
}

export function CardSkeleton({
  hasMedia = true,
  mediaHeight = 180,
  lines = 3,
  hasAvatar = true,
  avatarSize = 40,
  hasActions = true,
  actionCount = 2,
  ...themeProps
}: CardSkeletonProps) {
  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      <div className="react-loadly-preset react-loadly-preset-card">
        {hasMedia && (
          <SkeletonLoader
            variant="rectangular"
            height={mediaHeight}
            borderRadius={spacing.md}
            style={{ marginBottom: spacing.xl }}
          />
        )}
        {hasAvatar && (
          <div style={{ display: "flex", gap: spacing.lg, alignItems: "center", marginBottom: spacing.lg }}>
            <SkeletonLoader variant="circular" width={avatarSize} height={avatarSize} />
            <div style={{ flex: 1 }}>
              <SkeletonLoader width="45%" height={14} style={{ marginBottom: spacing.md }} />
              <SkeletonLoader width="30%" height={12} />
            </div>
          </div>
        )}
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonLoader
            key={index}
            width={index === lines - 1 ? "68%" : "100%"}
            style={{ marginBottom: index === lines - 1 ? 0 : spacing.md }}
          />
        ))}
        {hasActions && (
          <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.lg, marginTop: spacing.xl }}>
            {Array.from({ length: actionCount }).map((_, index) => (
              <SkeletonLoader key={index} variant="rounded" width={92} height={34} />
            ))}
          </div>
        )}
      </div>
    </SkeletonGroupLoader>
  );
}

export interface ListSkeletonProps extends SkeletonLoaderTheme {
  rows?: number;
  hasAvatar?: boolean;
  avatarShape?: "circular" | "rounded";
  avatarSize?: number;
  lineWidths?: SizeValue[];
}

export function ListSkeleton({
  rows = 3,
  hasAvatar = true,
  avatarShape = "circular",
  avatarSize = 36,
  lineWidths = ["80%", "60%"],
  ...themeProps
}: ListSkeletonProps) {
  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} style={{ display: "flex", gap: spacing.lg, marginBottom: spacing.lg }}>
          {hasAvatar && <SkeletonLoader variant={avatarShape} width={avatarSize} height={avatarSize} />}
          <div style={{ flex: 1 }}>
            {lineWidths.map((width, lineIndex) => (
              <SkeletonLoader
                key={lineIndex}
                width={width}
                style={{ marginBottom: lineIndex === lineWidths.length - 1 ? 0 : spacing.sm }}
              />
            ))}
          </div>
        </div>
      ))}
    </SkeletonGroupLoader>
  );
}

export interface TableSkeletonProps extends SkeletonLoaderTheme {
  rows?: number;
  columns?: number;
  hasHeader?: boolean;
  columnWidths?: SizeValue[];
  rowHeight?: number;
  headerHeight?: number;
}

export function TableSkeleton({
  rows = 4,
  columns = 4,
  hasHeader = true,
  columnWidths = [],
  rowHeight = 34,
  headerHeight = 40,
  ...themeProps
}: TableSkeletonProps) {
  const renderRow = (key: string, height: number) => (
    <div key={key} style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: spacing.lg }}>
      {Array.from({ length: columns }).map((_, index) => (
        <SkeletonLoader key={index} width={columnWidths[index] ?? "100%"} height={height} />
      ))}
    </div>
  );

  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      <div style={{ display: "grid", gap: spacing.md }}>
        {hasHeader && renderRow("header", headerHeight)}
        {Array.from({ length: rows }).map((_, index) => renderRow(`row-${index}`, rowHeight))}
      </div>
    </SkeletonGroupLoader>
  );
}

export interface ProfileSkeletonProps extends SkeletonLoaderTheme {
  avatarSize?: number;
  bioLines?: number;
  hasStats?: boolean;
  statsCount?: number;
  centered?: boolean;
}

export function ProfileSkeleton({
  avatarSize = 88,
  bioLines = 3,
  hasStats = true,
  statsCount = 3,
  centered = true,
  ...themeProps
}: ProfileSkeletonProps) {
  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      <div style={{ display: "grid", justifyItems: centered ? "center" : "start", gap: spacing.md }}>
        <SkeletonLoader variant="circular" width={avatarSize} height={avatarSize} />
        <SkeletonLoader width={160} height={18} />
        <SkeletonLoader width={110} height={14} />
        {Array.from({ length: bioLines }).map((_, index) => (
          <SkeletonLoader key={index} width={index === bioLines - 1 ? "55%" : "80%"} style={{ marginBottom: spacing.xs }} />
        ))}
        {hasStats && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${statsCount}, minmax(0, 1fr))`, gap: spacing.lg, width: "100%", marginTop: spacing.md }}>
            {Array.from({ length: statsCount }).map((_, index) => (
              <SkeletonLoader key={index} variant="rounded" height={54} borderRadius={20} />
            ))}
          </div>
        )}
      </div>
    </SkeletonGroupLoader>
  );
}

export interface ArticleSkeletonProps extends SkeletonLoaderTheme {
  hasHero?: boolean;
  heroHeight?: SizeValue;
  titleLines?: number;
  paragraphs?: number;
  linesPerParagraph?: number;
}

export function ArticleSkeleton({
  hasHero = true,
  heroHeight = 260,
  titleLines = 2,
  paragraphs = 3,
  linesPerParagraph = 4,
  ...themeProps
}: ArticleSkeletonProps) {
  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      {hasHero && <SkeletonLoader variant="rectangular" height={heroHeight} borderRadius={spacing.md} style={{ marginBottom: 20 }} />}
      {Array.from({ length: titleLines }).map((_, index) => (
        <SkeletonLoader key={index} height={24} width={index === titleLines - 1 ? "72%" : "88%"} style={{ marginBottom: 10 }} />
      ))}
      {Array.from({ length: paragraphs }).map((_, paragraphIndex) => (
        <div key={paragraphIndex} style={{ marginTop: 18 }}>
          {Array.from({ length: linesPerParagraph }).map((_, lineIndex) => (
          <SkeletonLoader
            key={lineIndex}
            width={lineIndex === linesPerParagraph - 1 ? "62%" : "100%"}
            style={{ marginBottom: lineIndex === linesPerParagraph - 1 ? 0 : spacing.sm }}
          />
          ))}
        </div>
      ))}
    </SkeletonGroupLoader>
  );
}

export interface FeedSkeletonProps extends SkeletonLoaderTheme {
  items?: number;
  itemVariant?: "card" | "list";
}

export function FeedSkeleton({ items = 3, itemVariant = "card", ...themeProps }: FeedSkeletonProps) {
  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      <div style={{ display: "grid", gap: 18 }}>
        {Array.from({ length: items }).map((_, index) =>
          itemVariant === "list" ? <ListSkeleton key={index} rows={1} /> : <CardSkeleton key={index} />
        )}
      </div>
    </SkeletonGroupLoader>
  );
}

export interface FormSkeletonProps extends SkeletonLoaderTheme {
  fields?: number;
  hasSubmit?: boolean;
}

export function FormSkeleton({ fields = 4, hasSubmit = true, ...themeProps }: FormSkeletonProps) {
  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      <div style={{ display: "grid", gap: spacing.lg }}>
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index}>
            <SkeletonLoader width={120} height={12} style={{ marginBottom: spacing.md }} />
            <SkeletonLoader variant="rounded" height={42} />
          </div>
        ))}
        {hasSubmit && <SkeletonLoader variant="rounded" width={140} height={40} />}
      </div>
    </SkeletonGroupLoader>
  );
}

export interface DashboardSkeletonProps extends SkeletonLoaderTheme {
  statCards?: number;
  hasChart?: boolean;
  chartHeight?: SizeValue;
  tableRows?: number;
  tableColumns?: number;
}

export function DashboardSkeleton({
  statCards = 4,
  hasChart = true,
  chartHeight = 240,
  tableRows = 5,
  tableColumns = 4,
  ...themeProps
}: DashboardSkeletonProps) {
  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      <div style={{ display: "grid", gap: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${statCards}, minmax(0, 1fr))`, gap: spacing.lg }}>
          {Array.from({ length: statCards }).map((_, index) => (
            <SkeletonLoader key={index} variant="rounded" height={82} />
          ))}
        </div>
        {hasChart && <SkeletonLoader variant="rectangular" height={chartHeight} borderRadius={spacing.md} />}
        <TableSkeleton rows={tableRows} columns={tableColumns} />
      </div>
    </SkeletonGroupLoader>
  );
}

export interface ProductCardSkeletonProps extends SkeletonLoaderTheme {
  imageHeight?: SizeValue;
  hasRating?: boolean;
  hasPrice?: boolean;
  hasCTA?: boolean;
}

export function ProductCardSkeleton({
  imageHeight = 220,
  hasRating = true,
  hasPrice = true,
  hasCTA = true,
  ...themeProps
}: ProductCardSkeletonProps) {
  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      <SkeletonLoader variant="rectangular" height={imageHeight} borderRadius={spacing.md} style={{ marginBottom: spacing.lg }} />
      <SkeletonLoader width="78%" style={{ marginBottom: spacing.md }} />
      {hasRating && <SkeletonLoader variant="rounded" width={80} height={28} style={{ marginBottom: spacing.md }} />}
      {hasPrice && <SkeletonLoader variant="rounded" width={120} height={28} style={{ marginBottom: spacing.lg }} />}
      {hasCTA && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SkeletonLoader variant="rounded" width={140} height={36} />
        </div>
      )}
    </SkeletonGroupLoader>
  );
}

export interface MediaCardSkeletonProps extends SkeletonLoaderTheme {
  thumbnailWidth?: SizeValue;
  lines?: number;
  hasTag?: boolean;
}

export function MediaCardSkeleton({
  thumbnailWidth = 120,
  lines = 2,
  hasTag = true,
  ...themeProps
}: MediaCardSkeletonProps) {
  return (
    <SkeletonGroupLoader {...pickTheme(themeProps)}>
      <div style={{ display: "flex", gap: spacing.lg, alignItems: "flex-start" }}>
        <SkeletonLoader variant="rectangular" width={thumbnailWidth} height={86} borderRadius={spacing.sm} />
        <div style={{ flex: 1 }}>
          {hasTag && <SkeletonLoader variant="rounded" width={64} height={20} style={{ marginBottom: spacing.md }} />}
          {Array.from({ length: lines }).map((_, index) => (
            <SkeletonLoader
              key={index}
              width={index === lines - 1 ? "58%" : "100%"}
              style={{ marginBottom: index === lines - 1 ? 0 : spacing.md }}
            />
          ))}
        </div>
      </div>
    </SkeletonGroupLoader>
  );
}
