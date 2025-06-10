#!/usr/bin/env python3
"""
Script to generate data.ts from combined_products_with_final_categories.csv
Filters for Amazon products where product_segment is not OUT_OF_SCOPE
"""

import pandas as pd
import json
import re
from typing import Dict, List, Any

def convert_sales_volume(sales_text: str) -> int:
    """Convert sales volume text to numeric value"""
    if pd.isna(sales_text) or sales_text == '':
        return 0
    
    # Clean the string
    sales_text = str(sales_text).strip()
    
    # Define conversion mapping
    conversion_map = {
        '50+ bought in past month': 50,
        '100+ bought in past month': 100,
        '200+ bought in past month': 200,
        '300+ bought in past month': 300,
        '400+ bought in past month': 400,
        '500+ bought in past month': 500,
        '600+ bought in past month': 600,
        '800+ bought in past month': 800,
        '900+ bought in past month': 900,
        '1K+ bought in past month': 1000,
        '2K+ bought in past month': 2000,
        '3K+ bought in past month': 3000,
        '4K+ bought in past month': 4000,
        '5K+ bought in past month': 5000,
    }
    
    # Direct mapping first
    if sales_text in conversion_map:
        return conversion_map[sales_text]
    
    # Pattern matching for other formats
    # Match patterns like "1K+", "2K+", etc.
    k_pattern = r'(\d+)K\+'
    match = re.search(k_pattern, sales_text)
    if match:
        return int(match.group(1)) * 1000
    
    # Match simple numbers like "300+", "500+"
    num_pattern = r'(\d+)\+'
    match = re.search(num_pattern, sales_text)
    if match:
        return int(match.group(1))
    
    return 0

def clean_brand_name(brand: str) -> str:
    """Clean and standardize brand names"""
    if pd.isna(brand):
        return "Unknown"
    
    brand = str(brand).strip()
    
    # Brand mapping for consistency
    brand_mapping = {
        'Amazon': 'Amazon',
        'ELEGRP': 'ELEGRP',
        'Leviton': 'Leviton',
        'Kasa': 'Kasa',
        'BESTTEN': 'BESTTEN',
        'GE': 'GE',
        'Lutron': 'Lutron',
        'Cloudy Bay': 'Cloudy Bay',
        'MOES': 'MOES',
        'TOPGREENER': 'TOPGREENER',
        'TP-Link': 'TP-Link',
        'TREATLIFE': 'TREATLIFE',
        'ENERLITES': 'ENERLITES Store',
        'Maxxima': 'Maxxima',
        'Deako': 'Deako',
        'TORCHSTAR': 'TORCHSTAR',
        'GHome Smart': 'GHome Smart',
        'GHome': 'GHome Smart',
        'Feit Electric': 'Feit Electric',
        'EVA LOGIK': 'EVA LOGIK',
        'Wyze': 'WYZE',
        'WYZE': 'WYZE',
        'UltraPro': 'UltraPro',
        'Enbrighten': 'Enbrighten',
        'meross': 'Meross',
        # Additional brand mappings
        'AIDA': 'AIDA',
        'Aiwode': 'Aiwode',
        'Amico': 'Amico',
        'Aqara': 'Aqara',
        'Baomain': 'Baomain',
        'CML Hardware': 'CML Hardware',
        'Clapper': 'Clapper',
        'DEWENWILS': 'DEWENWILS',
        'ELECTECK': 'ELECTECK',
        'Eaton': 'Eaton',
        'HAMRVL': 'HAMRVL',
        'HANIVERSE': 'HANIVERSE',
        'Humpptom': 'Humpptom',
        'LANBON': 'LANBON',
        'LIDER': 'LIDER',
        'Lee': 'Lee Electric',
        'Legrand': 'Legrand',
        'Lesim': 'Lesim',
        'NineLeaf': 'NineLeaf',
        'ORVIBO': 'ORVIBO',
        'Onite': 'Onite',
        'PPOZYLPC': 'PPOZYLPC',
        'PROCURU': 'PROCURU',
        'Philips Hue': 'Philips Hue',
        'SOZULAMP': 'SOZULAMP',
        'TAKETEK': 'TAKETEK',
        'TOPELER': 'TOPELER',
        'Thinkbee': 'Thinkbee',
        'ThunderWay': 'ThunderWay',
        'U-tec': 'U-tec',
        'WENGART': 'WENGART',
        'YNF': 'YNF',
        'ZOOZ': 'ZOOZ',
        'adorne': 'Legrand',  # adorne is a Legrand brand
        'greencycle': 'Greencycle',
        'mankk': 'Mankk',
        'Nexete': 'Nexete',
    }
    
    return brand_mapping.get(brand, brand)

def clean_title(title: str) -> str:
    """Clean product title by removing brand name from beginning"""
    if pd.isna(title):
        return ""
    
    title = str(title).strip()
    # Remove quotes if present
    if title.startswith('"') and title.endswith('"'):
        title = title[1:-1]
    
    return title

def categorize_product_type(title: str, segment: str) -> str:
    """Determine if product is Smart or Traditional based on title and segment"""
    if pd.isna(title):
        return "Traditional"
    
    title_lower = str(title).lower()
    segment_lower = str(segment).lower() if not pd.isna(segment) else ""
    
    smart_keywords = [
        'smart', 'wifi', 'wi-fi', 'alexa', 'google', 'siri', 
        'app', 'remote', 'voice', 'hub', 'zigbee', 'z-wave',
        'bluetooth', 'matter', 'homekit', 'caseta'
    ]
    
    for keyword in smart_keywords:
        if keyword in title_lower or keyword in segment_lower:
            return "Smart"
    
    return "Traditional"

def clean_unit_price(unit_price_str):
    """Clean unit price data to extract numeric value"""
    if pd.isna(unit_price_str) or unit_price_str == '':
        return 0.0
    
    # Convert to string
    unit_price_str = str(unit_price_str)
    
    # Look for patterns like "$30.00$30.00/count", "$7.50$7.50/count"
    # Extract the first price value
    match = re.search(r'\$(\d+(?:\.\d+)?)', unit_price_str)
    if match:
        return float(match.group(1))
    
    # If no dollar sign, look for any decimal number
    match = re.search(r'(\d+(?:\.\d+)?)', unit_price_str)
    if match:
        return float(match.group(1))
    
    return 0.0

def extract_pack_number(title):
    """Extract pack number from product title"""
    if pd.isna(title):
        return 1
    
    title = str(title).lower()
    
    # Look for various pack patterns
    patterns = [
        r'(\d+)\s*pack',           # "6 Pack", "10 Pack", "6Pack"
        r'(\d+)-pack',             # "6-Pack", "10-Pack"
        r'\((\d+)\s*pack\)',       # "(6 Pack)", "(10 Pack)"
        r'\[(\d+)\s*pack\]',       # "[6 Pack]", "[10 Pack]"
        r'(\d+)\s*count',          # "6 Count", "10 Count"
        r'\((\d+)\)',              # "(6)", "(10)" - as last resort
    ]
    
    for pattern in patterns:
        match = re.search(pattern, title)
        if match:
            pack_num = int(match.group(1))
            # Sanity check: pack numbers should be reasonable (1-100)
            if 1 <= pack_num <= 100:
                return pack_num
    
    return 1  # Default to 1 if no pack number found

def calculate_unit_price(row):
    """Calculate unit price considering pack numbers when unit_price is missing"""
    # First try to get cleaned unit price
    unit_price = clean_unit_price(row['unit_price'])
    
    # If no unit price available, calculate from total price and pack number
    if unit_price == 0.0:
        total_price = row['price_usd'] if not pd.isna(row['price_usd']) else 0.0
        if total_price > 0:
            pack_number = extract_pack_number(row['title'])
            unit_price = total_price / pack_number
    
    return unit_price

def load_and_process_data(csv_path: str) -> tuple:
    """Load CSV data and process it into dimmer and switch categories"""
    
    # Read CSV file
    df = pd.read_csv(csv_path)
    
    # Filter for Amazon products that are not OUT_OF_SCOPE
    filtered_df = df[
        (df['source'] == 'amazon') & 
        (df['product_segment'] != 'OUT_OF_SCOPE')
    ].copy()
    
    print(f"Total records: {len(df)}")
    print(f"Amazon records: {len(df[df['source'] == 'amazon'])}")
    print(f"Filtered records (Amazon, not OUT_OF_SCOPE): {len(filtered_df)}")
    
    # Print unique brands for verification
    unique_brands = sorted(filtered_df['brand'].dropna().unique())
    print(f"\n📋 Unique brands found ({len(unique_brands)}):")
    for i, brand in enumerate(unique_brands, 1):
        print(f"   {i:2d}. {brand}")
    
    # Process the data
    filtered_df['volume'] = filtered_df['recent_sales'].apply(convert_sales_volume)
    filtered_df['clean_brand'] = filtered_df['brand'].apply(clean_brand_name)
    filtered_df['clean_title'] = filtered_df['title'].apply(clean_title)
    filtered_df['product_type'] = filtered_df.apply(
        lambda row: categorize_product_type(row['title'], row['product_segment']), axis=1
    )
    
    # Print brand mapping results
    brand_mapping_results = filtered_df[['brand', 'clean_brand']].drop_duplicates().sort_values('brand')
    print(f"\n🔄 Brand mapping results:")
    for _, row in brand_mapping_results.iterrows():
        if pd.notna(row['brand']):
            if row['brand'] != row['clean_brand']:
                print(f"   {row['brand']} → {row['clean_brand']}")
            else:
                print(f"   {row['brand']} (unchanged)")
    
    # Check for unmapped brands (brands that might need cleaning)
    unmapped_brands = brand_mapping_results[
        (brand_mapping_results['brand'] == brand_mapping_results['clean_brand']) &
        (brand_mapping_results['brand'].notna())
    ]['brand'].tolist()
    
    if unmapped_brands:
        print(f"\n⚠️  Brands that might need cleaning mapping ({len(unmapped_brands)}):")
        for brand in sorted(unmapped_brands):
            print(f"   - {brand}")
        print("   → Consider adding these to the brand_mapping dictionary if they need standardization")
    
    # Fill missing prices with 0
    filtered_df['price_usd'] = pd.to_numeric(filtered_df['price_usd'], errors='coerce').fillna(0)
    # Calculate unit price using pack numbers when needed
    filtered_df['unit_price'] = filtered_df.apply(calculate_unit_price, axis=1)
    
    # Calculate revenue (price * volume)
    filtered_df['revenue'] = filtered_df['price_usd'] * filtered_df['volume']
    
    # Separate dimmer switches and light switches
    dimmer_df = filtered_df[filtered_df['category'] == 'Dimmer Switches'].copy()
    switch_df = filtered_df[filtered_df['category'] == 'Light Switches'].copy()
    
    print(f"Dimmer switches: {len(dimmer_df)}")
    print(f"Light switches: {len(switch_df)}")
    
    return dimmer_df, switch_df, filtered_df

def create_product_list(df: pd.DataFrame, category: str, limit: int = 20) -> List[Dict]:
    """Create product list for a category, sorted by revenue"""
    
    # Sort by revenue (descending) and take top products
    top_products = df.nlargest(limit, 'revenue')
    
    products = []
    for idx, row in top_products.iterrows():
        product = {
            "id": str(len(products) + 1),
            "name": row['clean_title'],
            "brand": row['clean_brand'],
            "price": float(row['price_usd']) if not pd.isna(row['price_usd']) else 0.0,
            "unitPrice": float(row['unit_price']) if not pd.isna(row['unit_price']) else float(row['price_usd']) if not pd.isna(row['price_usd']) else 0.0,
            "revenue": int(row['revenue']) if not pd.isna(row['revenue']) else 0,
            "volume": int(row['volume']) if not pd.isna(row['volume']) else 0,
            "url": row['product_url'] if not pd.isna(row['product_url']) else "",
        }
        products.append(product)
    
    return products

def calculate_brand_metrics(df: pd.DataFrame) -> List[Dict]:
    """Calculate brand performance metrics"""
    
    brand_stats = df.groupby('clean_brand').agg({
        'revenue': 'sum',
        'volume': 'sum',
        'platform_id': 'count'  # product count
    }).reset_index()
    
    # Calculate total revenue for market share
    total_revenue = brand_stats['revenue'].sum()
    
    brand_metrics = []
    for _, row in brand_stats.iterrows():
        metric = {
            "brand": row['clean_brand'],
            "dimmerRevenue": 0,  # Will be calculated separately
            "switchRevenue": 0   # Will be calculated separately
        }
        brand_metrics.append(metric)
    
    return brand_metrics

def calculate_brand_category_revenue(dimmer_df: pd.DataFrame, switch_df: pd.DataFrame) -> List[Dict]:
    """Calculate revenue by brand and category"""
    
    # Get all unique brands
    all_brands = set(dimmer_df['clean_brand'].unique()) | set(switch_df['clean_brand'].unique())
    
    brand_revenue = []
    for brand in all_brands:
        dimmer_rev = dimmer_df[dimmer_df['clean_brand'] == brand]['revenue'].sum()
        switch_rev = switch_df[switch_df['clean_brand'] == brand]['revenue'].sum()
        
        brand_revenue.append({
            "brand": brand,
            "dimmerRevenue": int(dimmer_rev),
            "switchRevenue": int(switch_rev)
        })
    
    # Sort by total revenue
    brand_revenue.sort(key=lambda x: x['dimmerRevenue'] + x['switchRevenue'], reverse=True)
    
    # Take top 10
    return brand_revenue[:10]

def calculate_executive_summary(all_df: pd.DataFrame, dimmer_df: pd.DataFrame, switch_df: pd.DataFrame) -> Dict:
    """Calculate executive summary metrics"""
    
    total_products = len(all_df)
    total_volume = all_df['volume'].sum()
    avg_price = all_df['price_usd'].mean()
    total_brands = all_df['clean_brand'].nunique()
    
    # Find market leader by volume
    brand_volume = all_df.groupby('clean_brand')['volume'].sum().sort_values(ascending=False)
    market_leader = brand_volume.index[0] if len(brand_volume) > 0 else "Unknown"
    market_leader_volume = brand_volume.iloc[0] if len(brand_volume) > 0 else 0
    market_leader_share = (market_leader_volume / total_volume * 100) if total_volume > 0 else 0
    market_leader_products = len(all_df[all_df['clean_brand'] == market_leader])
    
    return {
        "totalProducts": total_products,
        "totalSalesVolume": int(total_volume),
        "averagePrice": round(avg_price, 2) if not pd.isna(avg_price) else 0,
        "totalBrands": total_brands,
        "marketLeader": market_leader,
        "marketLeaderShare": round(market_leader_share, 2),
        "marketLeaderProducts": market_leader_products,
        "productDistribution": [
            {"name": "Light Switches", "value": len(switch_df)},
            {"name": "Dimmer Switches", "value": len(dimmer_df)}
        ]
    }

def calculate_product_segment_insights(dimmer_df: pd.DataFrame, switch_df: pd.DataFrame) -> Dict:
    """Calculate product segment revenue distribution for market insights"""
    
    # Calculate dimmer switches segment revenue
    dimmer_segments = dimmer_df.groupby('product_segment')['revenue'].sum().reset_index()
    dimmer_segments = dimmer_segments.sort_values('revenue', ascending=False)
    
    dimmer_segment_data = []
    for _, row in dimmer_segments.iterrows():
        dimmer_segment_data.append({
            "segment": row['product_segment'],
            "revenue": int(row['revenue']),
            "products": int(dimmer_df[dimmer_df['product_segment'] == row['product_segment']].shape[0])
        })
    
    # Calculate light switches segment revenue  
    switch_segments = switch_df.groupby('product_segment')['revenue'].sum().reset_index()
    switch_segments = switch_segments.sort_values('revenue', ascending=False)
    
    switch_segment_data = []
    for _, row in switch_segments.iterrows():
        switch_segment_data.append({
            "segment": row['product_segment'],
            "revenue": int(row['revenue']),
            "products": int(switch_df[switch_df['product_segment'] == row['product_segment']].shape[0])
        })
    
    return {
        "segmentRevenue": {
            "dimmerSwitches": dimmer_segment_data,
            "lightSwitches": switch_segment_data
        }
    }

def calculate_summary_metrics(all_df: pd.DataFrame, dimmer_df: pd.DataFrame, switch_df: pd.DataFrame) -> Dict:
    """Calculate summary metrics for the dashboard"""
    
    # Price range
    min_price = all_df['price_usd'].min()
    max_price = all_df['price_usd'].max()
    price_range = f"${min_price:.2f} - ${max_price:.2f}"
    
    # Average volume per product
    avg_volume = all_df['volume'].mean()
    
    # Median price
    median_price = all_df['price_usd'].median()
    
    # Major brands (5%+ market share)
    total_volume = all_df['volume'].sum()
    brand_shares = all_df.groupby('clean_brand')['volume'].sum() / total_volume * 100
    major_brands = len(brand_shares[brand_shares >= 5])
    
    return {
        "priceRange": price_range,
        "avgVolumePerProduct": float(avg_volume),
        "medianPrice": float(median_price),
        "majorBrands": major_brands
    }

def calculate_pricing_analysis(dimmer_df: pd.DataFrame, switch_df: pd.DataFrame) -> Dict:
    """Calculate detailed pricing analysis data with distributions and brand data"""
    
    def calculate_price_stats(prices):
        """Calculate statistical measures for price distribution"""
        if len(prices) == 0:
            return {
                "min": 0,
                "q1": 0,
                "median": 0,
                "mean": 0,
                "q3": 0,
                "max": 0
            }
        
        prices_sorted = sorted(prices)
        n = len(prices_sorted)
        
        return {
            "min": float(prices_sorted[0]),
            "q1": float(prices_sorted[n//4]) if n >= 4 else float(prices_sorted[0]),
            "median": float(prices_sorted[n//2]) if n > 0 else 0,
            "mean": float(sum(prices) / len(prices)),
            "q3": float(prices_sorted[3*n//4]) if n >= 4 else float(prices_sorted[-1]),
            "max": float(prices_sorted[-1])
        }
    
    # Calculate price distributions by category
    dimmer_sku_prices = dimmer_df['price_usd'].tolist()
    dimmer_unit_prices = dimmer_df['unit_price'].fillna(0).tolist()
    
    switch_sku_prices = switch_df['price_usd'].tolist()
    switch_unit_prices = switch_df['unit_price'].fillna(0).tolist()
    
    # Calculate brand price distributions
    def get_brand_distributions(df, category_name):
        brands_data = []
        top_brands = df['clean_brand'].value_counts().head(8).index.tolist()
        
        for brand in top_brands:
            brand_df = df[df['clean_brand'] == brand]
            if len(brand_df) > 0:
                # Remove duplicates by title to avoid duplicate entries
                brand_df_unique = brand_df.drop_duplicates(subset=['clean_title'], keep='first')
                brands_data.append({
                    "name": brand,
                    "skuPrices": brand_df_unique['price_usd'].tolist(),
                    "unitPrices": brand_df_unique['unit_price'].fillna(0).tolist()
                })
        
        return {
            "category": category_name,
            "brands": brands_data
        }
    
    price_distribution = [
        {
            "category": "Dimmer Switches",
            "skuPrices": dimmer_sku_prices,
            "unitPrices": dimmer_unit_prices,
            "stats": {
                "sku": calculate_price_stats(dimmer_sku_prices),
                "unit": calculate_price_stats([p for p in dimmer_unit_prices if p > 0])
            }
        },
        {
            "category": "Light Switches",
            "skuPrices": switch_sku_prices,
            "unitPrices": switch_unit_prices,
            "stats": {
                "sku": calculate_price_stats(switch_sku_prices),
                "unit": calculate_price_stats([p for p in switch_unit_prices if p > 0])
            }
        }
    ]
    
    brand_price_distribution = [
        get_brand_distributions(dimmer_df, "Dimmer Switches"),
        get_brand_distributions(switch_df, "Light Switches")
    ]
    
    return {
        "priceDistribution": price_distribution,
        "brandPriceDistribution": brand_price_distribution
    }

def generate_data_ts(csv_path: str, output_path: str):
    """Main function to generate data.ts file"""
    
    # Load and process data
    dimmer_df, switch_df, all_df = load_and_process_data(csv_path)
    
    # Create product lists (top 15 for each category)
    dimmer_products = create_product_list(dimmer_df, "Dimmer Switches", 15)
    switch_products = create_product_list(switch_df, "Light Switches", 15)
    
    # Calculate metrics
    executive_summary = calculate_executive_summary(all_df, dimmer_df, switch_df)
    brand_category_revenue = calculate_brand_category_revenue(dimmer_df, switch_df)
    market_insights = calculate_product_segment_insights(dimmer_df, switch_df)
    summary_metrics = calculate_summary_metrics(all_df, dimmer_df, switch_df)
    pricing_analysis = calculate_pricing_analysis(dimmer_df, switch_df)
    
    # Generate TypeScript content
    ts_content = f'''// Auto-generated from combined_products_with_final_categories.csv
// Generated on {pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")}
// Source: Amazon scraped data (filtered: source=amazon, product_segment!=OUT_OF_SCOPE)

export async function fetchDashboardData() {{
  return {{
    executiveSummary: {json.dumps(executive_summary, indent=6)},
    brandAnalysis: {{
      brandCategoryRevenue: {json.dumps(brand_category_revenue, indent=8)}
    }},
    productAnalysis: {{
      priceVsRevenue: [
        {{
          category: "Dimmer Switches",
          products: {json.dumps(dimmer_products, indent=12)}
        }},
        {{
          category: "Light Switches", 
          products: {json.dumps(switch_products, indent=12)}
        }}
      ],
      topProducts: [
        {{
          category: "Dimmer Switches",
          products: {json.dumps(dimmer_products, indent=12)}
        }},
        {{
          category: "Light Switches", 
          products: {json.dumps(switch_products, indent=12)}
        }}
      ]
    }},
    pricingAnalysis: {json.dumps(pricing_analysis, indent=6)},
    marketInsights: {json.dumps(market_insights, indent=6)},
    summaryMetrics: {json.dumps(summary_metrics, indent=6)}
  }};
}}
'''
    
    # Write to file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"✅ Generated {output_path}")
    print(f"📊 Data summary:")
    print(f"   - Total products: {len(all_df)}")
    print(f"   - Dimmer switches: {len(dimmer_df)} (top {len(dimmer_products)} included)")
    print(f"   - Light switches: {len(switch_df)} (top {len(switch_products)} included)")
    print(f"   - Total brands: {all_df['clean_brand'].nunique()}")
    print(f"   - Market leader: {executive_summary['marketLeader']} ({executive_summary['marketLeaderShare']}%)")

if __name__ == "__main__":
    csv_path = "backend/data/result/product_segment/combined_products_cleaned/combined_products_with_final_categories.csv"
    output_path = "frontend/lib/data.ts"
    
    generate_data_ts(csv_path, output_path) 