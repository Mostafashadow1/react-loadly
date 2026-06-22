import React from "react";
import { SkeletonTheme } from "../context/SkeletonGroupContext";
import { Skeleton } from "../components/Skeleton";
import { SkeletonGroup } from "../components/SkeletonGroup";
import { spacing } from "../utils/spacing";

type SizeValue = number | string;

const themeKeys = ["animation", "speed", "baseColor", "highlightColor", "direction"] as const;

const pickTheme = (props: SkeletonTheme): SkeletonTheme =>
  themeKeys.reduce<SkeletonTheme>((theme, key) => {
    if (props[key] !== undefined) theme[key] = props[key] as never;
    return theme;
  }, {});

export interface CardSkeletonProps extends SkeletonTheme {
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
    <SkeletonGroup {...pickTheme(themeProps)}>
      <div className="react-loadly-preset react-loadly-preset-card">
        {hasMedia && (
          <Skeleton
            variant="rectangular"
            height={mediaHeight}
            borderRadius={spacing.md}
            style={{ marginBottom: spacing.xl }}
          />
        )}
        {hasAvatar && (
          <div style={{ display: "flex", gap: spacing.lg, alignItems: "center", marginBottom: spacing.lg }}>
            <Skeleton variant="circular" width={avatarSize} height={avatarSize} />
            <div style={{ flex: 1 }}>
              <Skeleton width="45%" height={14} style={{ marginBottom: spacing.md }} />
              <Skeleton width="30%" height={12} />
            </div>
          </div>
        )}
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            width={index === lines - 1 ? "68%" : "100%"}
            style={{ marginBottom: index === lines - 1 ? 0 : spacing.md }}
          />
        ))}
        {hasActions && (
          <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.lg, marginTop: spacing.xl }}>
            {Array.from({ length: actionCount }).map((_, index) => (
              <Skeleton key={index} variant="rounded" width={92} height={34} />
            ))}
          </div>
        )}
      </div>
    </SkeletonGroup>
  );
}

export interface ListSkeletonProps extends SkeletonTheme {
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
    <SkeletonGroup {...pickTheme(themeProps)}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} style={{ display: "flex", gap: spacing.lg, marginBottom: spacing.lg }}>
          {hasAvatar && <Skeleton variant={avatarShape} width={avatarSize} height={avatarSize} />}
          <div style={{ flex: 1 }}>
            {lineWidths.map((width, lineIndex) => (
              <Skeleton
                key={lineIndex}
                width={width}
                style={{ marginBottom: lineIndex === lineWidths.length - 1 ? 0 : spacing.sm }}
              />
            ))}
          </div>
        </div>
      ))}
    </SkeletonGroup>
  );
}

export interface TableSkeletonProps extends SkeletonTheme {
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
        <Skeleton key={index} width={columnWidths[index] ?? "100%"} height={height} />
      ))}
    </div>
  );

  return (
    <SkeletonGroup {...pickTheme(themeProps)}>
      <div style={{ display: "grid", gap: spacing.md }}>
        {hasHeader && renderRow("header", headerHeight)}
        {Array.from({ length: rows }).map((_, index) => renderRow(`row-${index}`, rowHeight))}
      </div>
    </SkeletonGroup>
  );
}

export interface ProfileSkeletonProps extends SkeletonTheme {
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
    <SkeletonGroup {...pickTheme(themeProps)}>
      <div style={{ display: "grid", justifyItems: centered ? "center" : "start", gap: spacing.md }}>
        <Skeleton variant="circular" width={avatarSize} height={avatarSize} />
        <Skeleton width={160} height={18} />
        <Skeleton width={110} height={14} />
        {Array.from({ length: bioLines }).map((_, index) => (
          <Skeleton key={index} width={index === bioLines - 1 ? "55%" : "80%"} style={{ marginBottom: spacing.xs }} />
        ))}
        {hasStats && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${statsCount}, minmax(0, 1fr))`, gap: spacing.lg, width: "100%", marginTop: spacing.md }}>
            {Array.from({ length: statsCount }).map((_, index) => (
              <Skeleton key={index} variant="rounded" height={54} borderRadius={20} />
            ))}
          </div>
        )}
      </div>
    </SkeletonGroup>
  );
}

export interface ArticleSkeletonProps extends SkeletonTheme {
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
    <SkeletonGroup {...pickTheme(themeProps)}>
      {hasHero && <Skeleton variant="rectangular" height={heroHeight} borderRadius={spacing.md} style={{ marginBottom: 20 }} />}
      {Array.from({ length: titleLines }).map((_, index) => (
        <Skeleton key={index} height={24} width={index === titleLines - 1 ? "72%" : "88%"} style={{ marginBottom: 10 }} />
      ))}
      {Array.from({ length: paragraphs }).map((_, paragraphIndex) => (
        <div key={paragraphIndex} style={{ marginTop: 18 }}>
          {Array.from({ length: linesPerParagraph }).map((_, lineIndex) => (
          <Skeleton
            key={lineIndex}
            width={lineIndex === linesPerParagraph - 1 ? "62%" : "100%"}
            style={{ marginBottom: lineIndex === linesPerParagraph - 1 ? 0 : spacing.sm }}
          />
          ))}
        </div>
      ))}
    </SkeletonGroup>
  );
}

export interface FeedSkeletonProps extends SkeletonTheme {
  items?: number;
  itemVariant?: "card" | "list";
}

export function FeedSkeleton({ items = 3, itemVariant = "card", ...themeProps }: FeedSkeletonProps) {
  return (
    <SkeletonGroup {...pickTheme(themeProps)}>
      <div style={{ display: "grid", gap: 18 }}>
        {Array.from({ length: items }).map((_, index) =>
          itemVariant === "list" ? <ListSkeleton key={index} rows={1} /> : <CardSkeleton key={index} />
        )}
      </div>
    </SkeletonGroup>
  );
}

export interface FormSkeletonProps extends SkeletonTheme {
  fields?: number;
  hasSubmit?: boolean;
}

export function FormSkeleton({ fields = 4, hasSubmit = true, ...themeProps }: FormSkeletonProps) {
  return (
    <SkeletonGroup {...pickTheme(themeProps)}>
      <div style={{ display: "grid", gap: spacing.lg }}>
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index}>
            <Skeleton width={120} height={12} style={{ marginBottom: spacing.md }} />
            <Skeleton variant="rounded" height={42} />
          </div>
        ))}
        {hasSubmit && <Skeleton variant="rounded" width={140} height={40} />}
      </div>
    </SkeletonGroup>
  );
}

export interface DashboardSkeletonProps extends SkeletonTheme {
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
    <SkeletonGroup {...pickTheme(themeProps)}>
      <div style={{ display: "grid", gap: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${statCards}, minmax(0, 1fr))`, gap: spacing.lg }}>
          {Array.from({ length: statCards }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={82} />
          ))}
        </div>
        {hasChart && <Skeleton variant="rectangular" height={chartHeight} borderRadius={spacing.md} />}
        <TableSkeleton rows={tableRows} columns={tableColumns} />
      </div>
    </SkeletonGroup>
  );
}

export interface ProductCardSkeletonProps extends SkeletonTheme {
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
    <SkeletonGroup {...pickTheme(themeProps)}>
      <Skeleton variant="rectangular" height={imageHeight} borderRadius={spacing.md} style={{ marginBottom: spacing.lg }} />
      <Skeleton width="78%" style={{ marginBottom: spacing.md }} />
      {hasRating && <Skeleton variant="rounded" width={80} height={28} style={{ marginBottom: spacing.md }} />}
      {hasPrice && <Skeleton variant="rounded" width={120} height={28} style={{ marginBottom: spacing.lg }} />}
      {hasCTA && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" width={140} height={36} />
        </div>
      )}
    </SkeletonGroup>
  );
}

export interface MediaCardSkeletonProps extends SkeletonTheme {
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
    <SkeletonGroup {...pickTheme(themeProps)}>
      <div style={{ display: "flex", gap: spacing.lg, alignItems: "flex-start" }}>
        <Skeleton variant="rectangular" width={thumbnailWidth} height={86} borderRadius={spacing.sm} />
        <div style={{ flex: 1 }}>
          {hasTag && <Skeleton variant="rounded" width={64} height={20} style={{ marginBottom: spacing.md }} />}
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              width={index === lines - 1 ? "58%" : "100%"}
              style={{ marginBottom: index === lines - 1 ? 0 : spacing.md }}
            />
          ))}
        </div>
      </div>
    </SkeletonGroup>
  );
}
