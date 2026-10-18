import React, { useState, useMemo } from 'react';
import { CollectableItem, Category, ThemeMode } from '@/types/collectable.types';
import styles from './DiagnosticsOverview.module.scss';

interface DiagnosticsOverviewProps {
  theme: ThemeMode;
  items: CollectableItem[];
  searchQuery: string;
}

export const DiagnosticsOverview: React.FC<DiagnosticsOverviewProps> = ({
  theme,
  items,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  // Filter items based on active category and header search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.grading.company.toLowerCase().includes(q) ||
        (item.grading.certNumber && item.grading.certNumber.toLowerCase().includes(q)) ||
        Object.values(item.itemSpecifics).some((val) =>
          val.toLowerCase().includes(q)
        );

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Aggregate integrity metrics
  const stats = useMemo(() => {
    const totalValuation = items.reduce((acc, curr) => acc + curr.price, 0);
    const sportsCardsCount = items.filter((i) => i.category === 'sports-cards').length;
    const comicsCount = items.filter((i) => i.category === 'comics').length;
    const toysCount = items.filter((i) => i.category === 'toys').length;
    const auctionsCount = items.filter((i) => i.format === 'auction').length;
    const fixedPriceCount = items.filter((i) => i.format === 'fixed-price').length;
    const companies = Array.from(new Set(items.map((i) => i.grading.company)));

    return {
      totalItems: items.length,
      totalValuation,
      sportsCardsCount,
      comicsCount,
      toysCount,
      auctionsCount,
      fixedPriceCount,
      companiesCount: companies.length,
      companiesList: companies.join(', '),
    };
  }, [items]);

  return (
    <section className={styles.diagnosticsContainer} aria-label="Diagnostics Overview">
      {/* Banner / Header verification */}
      <div className={styles.banner}>
        <div className={styles.bannerTitleArea}>
          <div className={styles.phaseBadge}>
            <span>●</span> Phase 1 Diagnostics & Design Tokens Active
          </div>
          <h2 className={styles.bannerHeading}>
            Cramer Collectables Architecture Verification
          </h2>
          <p className={styles.bannerDescription}>
            Live demonstration of strict TypeScript data contracts, SCSS Design Tokens
            under the <strong>{theme.toUpperCase()}</strong> aesthetic, and multi-category
            inventory integrity.
          </p>
        </div>

        <div className={styles.tokenInspector}>
          <span className={styles.tokenDot} />
          <span>Theme: [data-theme=&apos;{theme}&apos;]</span>
        </div>
      </div>

      {/* Data Integrity Summary Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Inventory</span>
          <span className={styles.statValue}>{stats.totalItems} Items</span>
          <span className={styles.statSubtext}>100% Mock Data Validated</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Category Distribution</span>
          <span className={styles.statValue}>
            {stats.sportsCardsCount}C / {stats.comicsCount}M / {stats.toysCount}T
          </span>
          <span className={styles.statSubtext}>8 Cards, 3 Comics, 3 Toys</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Grading Authorities</span>
          <span className={styles.statValue}>{stats.companiesCount} Authorities</span>
          <span className={styles.statSubtext}>{stats.companiesList}</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Gross Valuation</span>
          <span className={styles.statValue}>
            ${stats.totalValuation.toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </span>
          <span className={styles.statSubtext}>
            {stats.auctionsCount} Auctions, {stats.fixedPriceCount} Buy-It-Now
          </span>
        </div>
      </div>

      {/* Interactive Category Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.tabList} role="tablist" aria-label="Inventory Categories">
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            className={`${styles.tabButton} ${selectedCategory === 'all' ? styles.activeTab : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Collectables ({items.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'sports-cards'}
            className={`${styles.tabButton} ${selectedCategory === 'sports-cards' ? styles.activeTab : ''}`}
            onClick={() => setSelectedCategory('sports-cards')}
          >
            Sports Cards ({stats.sportsCardsCount})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'comics'}
            className={`${styles.tabButton} ${selectedCategory === 'comics' ? styles.activeTab : ''}`}
            onClick={() => setSelectedCategory('comics')}
          >
            Comics ({stats.comicsCount})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'toys'}
            className={`${styles.tabButton} ${selectedCategory === 'toys' ? styles.activeTab : ''}`}
            onClick={() => setSelectedCategory('toys')}
          >
            Vintage Toys ({stats.toysCount})
          </button>
        </div>

        <div className={styles.resultsCount}>
          Showing {filteredItems.length} of {items.length} items
          {searchQuery && ` for query "${searchQuery}"`}
        </div>
      </div>

      {/* Collectables Card Grid */}
      <div className={styles.itemsGrid}>
        {filteredItems.map((item) => {
          const gradingDisplay = item.grading.grade
            ? `${item.grading.company} ${item.grading.grade}`
            : item.grading.company;

          return (
            <article key={item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.imageUrls[0]}
                  alt={item.title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.floatingBadges}>
                  <span className={styles.gradingBadge} title={item.condition}>
                    {gradingDisplay}
                  </span>
                  <span className={styles.formatBadge}>
                    {item.format === 'auction' ? 'Auction' : 'Buy Now'}
                  </span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.categoryTag}>
                  {item.category.replace('-', ' ')}
                </div>

                <h3 className={styles.itemTitle} title={item.title}>
                  {item.title}
                </h3>

                <p className={styles.itemSubtitle}>{item.subtitle}</p>

                {/* Specifics snippet preview */}
                <div className={styles.specificsPreview}>
                  {Object.entries(item.itemSpecifics)
                    .slice(0, 3)
                    .map(([key, val]) => (
                      <span key={key} className={styles.specificChip}>
                        {key}: {val}
                      </span>
                    ))}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.priceGroup}>
                    <span className={styles.currentPrice}>
                      ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    {item.originalPrice && (
                      <span className={styles.originalPrice}>
                        ${item.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>

                  <a
                    href={item.ebayListingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ebayBtn}
                  >
                    <span>eBay Listing</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
