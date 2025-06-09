"""
COMPETITOR REPORT IMPLEMENTATION PLAN
=====================================

Report Title: "Dimmers and Light Switches Category Analysis - Amazon & Home Depot"

REPORT SECTIONS & VISUALIZATIONS:

1. EXECUTIVE SUMMARY
   - Key metrics dashboard
   - Category overview statistics
   - Major findings highlight

2. MARKET OVERVIEW
   a) Amazon Category Overview
      - Plot Type: Summary Statistics Dashboard
      - Content: Amazon category metrics (products with sales volume only)
      - Data: Total products, avg price_usd, total sales volume

3. BRAND ANALYSIS
   a) Top Brands by Market Share
      - Plot Type: Horizontal Bar Chart (Top 10-15 brands)
      - Content: Brand ranking by sales volume and product count
      - Data: Total sales volume, product count, market share %
   
   b) Brand Market Share Distribution
      - Plot Type: Pie Chart + Donut Chart
      - Content: Market concentration analysis
      - Data: Top 5 brands vs "Others" category
   
   c) Brand Performance Matrix
      - Plot Type: Scatter Plot
      - Content: Sales Volume vs. Average Selling Price by brand
      - Data: X-axis: Total sales volume, Y-axis: Average price_usd, Bubble size: Product count

4. PRODUCT ANALYSIS
   a) Top Products Overall
      - Plot Type: Horizontal Bar Chart
      - Content: Best-selling products by sales volume and price
      - Data: Top 20 products by sales volume (Amazon products with volume data only)
   
   b) Product Market Share
      - Plot Type: Treemap
      - Content: Visual representation of product hierarchy
      - Data: Product share within category and subcategory
   
   c) Top Products by Brand
      - Plot Type: Grouped Bar Chart
      - Content: Leading products for each major brand
      - Data: Top 3-5 products per top 10 brands

5. PRICING ANALYSIS
   a) Category Pricing Overview
      - Plot Type: Violin Plot
      - Content: Price distribution across Amazon category
      - Data: price_usd density distribution for products with sales volume
   
   b) Price vs. Volume Relationship
      - Plot Type: Scatter Plot
      - Content: Price vs. sales volume analysis
      - Data: price_usd vs. converted sales volume numbers

6. COMPETITIVE POSITIONING
   a) Brand Positioning Map
      - Plot Type: Bubble Chart (2D positioning)
      - Content: Brand positioning by price tier and sales volume
      - Data: X-axis: Average price_usd, Y-axis: Average sales volume per product, Bubble: Product count

7. MARKET INSIGHTS
   a) Price Range Analysis
      - Plot Type: Histogram
      - Content: Product distribution across price ranges
      - Data: Product count in $0-25, $25-50, $50-100, $100+ ranges
   
   b) Smart vs. Traditional Split
      - Plot Type: Side-by-side comparison charts
      - Content: Smart products vs. traditional products analysis
      - Data: Product count, average sales volume, price_usd comparison

DATA REQUIREMENTS:
==================
- Amazon products: ONLY products with recent_sales data
- Product fields: title, brand, category, price_usd, recent_sales
- Sales volume conversion: Raw strings → numeric values
  * '300+ bought in past month' → 300
  * '1K+ bought in past month' → 1000  
  * '4K+ bought in past month' → 4000
  * etc.
- Product specifications: Smart vs. traditional classification
- Data source: Amazon only (filtered by source column)

TECHNICAL IMPLEMENTATION:
========================
Dependencies:
- pandas: Data manipulation and analysis
- matplotlib/seaborn: Static visualizations
- plotly: Interactive visualizations
- numpy: Numerical computations
- scipy: Statistical analysis

Key Functions to Implement:
1. data_loader(): Load Amazon data, filter products with sales volume only
2. volume_converter(): Convert sales volume strings to numeric values
   - Parse patterns: '300+', '1K+', '4K+', etc.
   - Handle 'K' multiplier (1K = 1000)
   - Extract base numbers from raw strings
3. brand_analyzer(): Calculate brand metrics and rankings
4. product_analyzer(): Product performance analysis
5. pricing_analyzer(): Price distribution analysis using price_usd
6. visualization_generator(): Create all charts and plots
7. report_generator(): Compile final HTML report with insights

Output Format:
- HTML report with interactive visualizations (PRIMARY OUTPUT)
- CSV files with detailed metrics for reference
- Dashboard-style HTML overview page

METRICS TO CALCULATE:
====================
1. Market Share = (Brand Sales Volume / Total Category Volume) * 100
2. Volume Share = (Product Sales Volume / Total Category Volume) * 100
3. Average Selling Price = Average price_usd by brand/category
4. Category ASP = Sum(Product price_usd * Volume Weight)
5. Concentration Ratio = Sum of top N brands' volume shares
6. Price Premium = (Brand ASP / Category ASP - 1) * 100
7. Volume per Product = Average sales volume per product by brand
8. Sales Volume = Numeric conversion of raw volume strings

VOLUME CONVERSION MAPPING:
=========================
- '50+ bought in past month' → 50
- '100+ bought in past month' → 100
- '200+ bought in past month' → 200
- '300+ bought in past month' → 300
- '400+ bought in past month' → 400
- '500+ bought in past month' → 500
- '600+ bought in past month' → 600
- '800+ bought in past month' → 800
- '900+ bought in past month' → 900
- '1K+ bought in past month' → 1000
- '2K+ bought in past month' → 2000
- '3K+ bought in past month' → 3000
- '4K+ bought in past month' → 4000
- '5K+ bought in past month' → 5000

"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.offline as pyo
from datetime import datetime
import re
import warnings
warnings.filterwarnings('ignore')

class CompetitorReportGenerator:
    """
    Amazon Dimmers and Light Switches Category Analysis Report Generator
    """
    
    def __init__(self, data_path=None):
        """
        Initialize the report generator
        
        Args:
            data_path (str): Path to the data file
        """
        self.data_path = data_path
        self.df = None
        self.brand_metrics = None
        self.product_metrics = None
        self.category_stats = None
        self.figures = {}
        
    def volume_converter(self, volume_str):
        """
        Convert sales volume strings to numeric values
        
        Args:
            volume_str (str): Raw volume string like '300+ bought in past month'
            
        Returns:
            int: Numeric volume value
        """
        if pd.isna(volume_str) or volume_str == '':
            return 0
            
        # Clean the string and extract numbers
        volume_str = str(volume_str).strip()
        
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
            '5K+ bought in past month': 5000
        }
        
        # Direct mapping if exact match
        if volume_str in conversion_map:
            return conversion_map[volume_str]
        
        # Parse pattern with regex for flexible matching
        # Pattern: number + optional 'K' + '+ bought in past month'
        pattern = r'(\d+(?:\.\d+)?)([Kk]?)\+?\s*bought\s*in\s*past\s*month'
        match = re.search(pattern, volume_str, re.IGNORECASE)
        
        if match:
            number = float(match.group(1))
            multiplier = match.group(2).upper()
            
            if multiplier == 'K':
                number *= 1000
                
            return int(number)
        
        # Fallback: try to extract any number
        numbers = re.findall(r'\d+', volume_str)
        if numbers:
            base_num = int(numbers[0])
            if 'K' in volume_str.upper():
                base_num *= 1000
            return base_num
        
        return 0
    
    def data_loader(self, df=None):
        """
        Load and filter Amazon data for products with sales volume only
        
        Args:
            df (pandas.DataFrame): Input dataframe, if None will load from file
            
        Returns:
            pandas.DataFrame: Cleaned and filtered dataframe
        """
        if df is not None:
            self.df = df.copy()
        elif self.data_path:
            # Load from file
            if self.data_path.endswith('.csv'):
                self.df = pd.read_csv(self.data_path)
            elif self.data_path.endswith('.xlsx'):
                self.df = pd.read_excel(self.data_path)
            else:
                raise ValueError("Unsupported file format. Use CSV or Excel.")
        else:
            raise ValueError("No data source provided")
        
        print(f"Initial dataset shape: {self.df.shape}")
        
        # Filter for Amazon products only if source column exists
        if 'source' in self.df.columns:
            initial_count = len(self.df)
            amazon_count = (self.df['source'] == 'amazon').sum()
            self.df = self.df[self.df['source'] == 'amazon']
            print(f"Amazon products only: {len(self.df)} (filtered out {initial_count - amazon_count} non-Amazon products)")
        else:
            print("No 'source' column found, assuming all products are from Amazon")
        
        # Filter for Amazon products with sales volume data only
        volume_columns = ['recent_sales', 'sales_volume_raw', 'sales_volume', 'volume', 'bought_in_past_month']
        volume_col = None
        
        for col in volume_columns:
            if col in self.df.columns:
                volume_col = col
                break
        
        if volume_col is None:
            raise ValueError(f"No sales volume column found. Expected one of: {volume_columns}")
        
        # Filter out rows without sales volume data
        initial_count = len(self.df)
        self.df = self.df[self.df[volume_col].notna()]
        self.df = self.df[self.df[volume_col] != '']
        
        print(f"Products with sales volume: {len(self.df)} (filtered out {initial_count - len(self.df)})")
        
        # Convert sales volume to numeric
        self.df['sales_volume_numeric'] = self.df[volume_col].apply(self.volume_converter)
        
        # Filter out products with 0 volume (failed conversions)
        self.df = self.df[self.df['sales_volume_numeric'] > 0]
        print(f"Products with valid volume conversion: {len(self.df)}")
        
        # Ensure required columns exist
        required_cols = ['price_usd', 'brand']
        missing_cols = [col for col in required_cols if col not in self.df.columns]
        if missing_cols:
            raise ValueError(f"Missing required columns: {missing_cols}")
        
        # Clean price_usd column
        if 'price_usd' in self.df.columns:
            self.df['price_usd'] = pd.to_numeric(self.df['price_usd'], errors='coerce')
            self.df = self.df[self.df['price_usd'].notna()]
            self.df = self.df[self.df['price_usd'] > 0]
            print(f"Products with valid price: {len(self.df)}")
        
        # Create unit price column (list_price_usd with fallback to price_usd)
        if 'list_price_usd' in self.df.columns:
            self.df['list_price_usd'] = pd.to_numeric(self.df['list_price_usd'], errors='coerce')
            self.df['unit_price'] = self.df['list_price_usd'].fillna(self.df['price_usd'])
        else:
            self.df['unit_price'] = self.df['price_usd']
        
        # Clean brand column
        self.df['brand'] = self.df['brand'].fillna('Unknown')
        self.df['brand'] = self.df['brand'].astype(str).str.strip()
        
        # Create smart vs traditional classification if not exists
        if 'product_type' not in self.df.columns:
            smart_keywords = ['smart', 'wifi', 'bluetooth', 'app', 'voice', 'alexa', 'google', 'hub']
            self.df['product_type'] = 'Traditional'
            
            if 'title' in self.df.columns:
                smart_mask = self.df['title'].str.lower().str.contains('|'.join(smart_keywords), na=False)
                self.df.loc[smart_mask, 'product_type'] = 'Smart'
            elif 'name' in self.df.columns:
                smart_mask = self.df['name'].str.lower().str.contains('|'.join(smart_keywords), na=False)
                self.df.loc[smart_mask, 'product_type'] = 'Smart'
        
        print(f"Final dataset shape: {self.df.shape}")
        print(f"Smart products: {(self.df['product_type'] == 'Smart').sum()}")
        print(f"Traditional products: {(self.df['product_type'] == 'Traditional').sum()}")
        
        return self.df
    
    def get_brand_colors(self):
        """
        Get consistent brand color mapping for all visualizations
        
        Returns:
            dict: Brand name to color mapping
        """
        if self.brand_metrics is None:
            self.brand_analyzer()
        
        # Get top brands for consistent coloring
        top_brands = self.brand_metrics['brand'].head(8).tolist()
        
        # Create base color mapping
        brand_colors = {
            top_brands[i]: px.colors.qualitative.Set3[i] for i in range(len(top_brands))
        }
        brand_colors['Other'] = '#D3D3D3'  # Grey for other brands
        
        # Override specific brand colors for better visibility
        if 'Leviton' in brand_colors:
            brand_colors['Leviton'] = '#9B59B6'  # Purple - very salient
        if 'Lutron' in brand_colors:
            brand_colors['Lutron'] = '#E67E22'  # Orange - distinguishable
        if 'GE' in brand_colors:
            brand_colors['GE'] = '#3498DB'  # Blue
        if 'TP-Link' in brand_colors:
            brand_colors['TP-Link'] = '#F39C12'  # Orange
        if 'DEWENWILS' in brand_colors:
            brand_colors['DEWENWILS'] = '#1ABC9C'  # Teal
        if 'Treatlife' in brand_colors:
            brand_colors['Treatlife'] = '#E67E22'  # Dark orange
        if 'Kasa Smart' in brand_colors:
            brand_colors['Kasa Smart'] = '#8E44AD'  # Dark purple
        
        return brand_colors, top_brands
    
    def calculate_category_stats(self):
        """Calculate overall category statistics"""
        self.category_stats = {
            'total_products': len(self.df),
            'total_volume': self.df['sales_volume_numeric'].sum(),
            'avg_price': self.df['price_usd'].mean(),
            'median_price': self.df['price_usd'].median(),
            'total_brands': self.df['brand'].nunique(),
            'avg_volume_per_product': self.df['sales_volume_numeric'].mean(),
            'price_range': {
                'min': self.df['price_usd'].min(),
                'max': self.df['price_usd'].max()
            }
        }
        return self.category_stats
    
    def brand_analyzer(self):
        """Analyze brand performance metrics"""
        brand_stats = []
        
        for brand in self.df['brand'].unique():
            brand_data = self.df[self.df['brand'] == brand]
            
            stats = {
                'brand': brand,
                'product_count': len(brand_data),
                'total_volume': brand_data['sales_volume_numeric'].sum(),
                'avg_volume_per_product': brand_data['sales_volume_numeric'].mean(),
                'avg_price': brand_data['price_usd'].mean(),
                'median_price': brand_data['price_usd'].median(),
                'price_range': brand_data['price_usd'].max() - brand_data['price_usd'].min(),
                'market_share_volume': (brand_data['sales_volume_numeric'].sum() / 
                                      self.df['sales_volume_numeric'].sum()) * 100,
                'smart_products': (brand_data['product_type'] == 'Smart').sum(),
                'traditional_products': (brand_data['product_type'] == 'Traditional').sum()
            }
            
            # Calculate price premium
            stats['price_premium'] = ((stats['avg_price'] / self.category_stats['avg_price']) - 1) * 100
            
            brand_stats.append(stats)
        
        self.brand_metrics = pd.DataFrame(brand_stats)
        self.brand_metrics = self.brand_metrics.sort_values('total_volume', ascending=False)
        
        return self.brand_metrics
    
    def product_analyzer(self):
        """Analyze individual product performance"""
        product_stats = self.df.copy()
        
        # Calculate product market share
        product_stats['volume_share'] = (product_stats['sales_volume_numeric'] / 
                                       self.df['sales_volume_numeric'].sum()) * 100
        
        # Sort by volume
        product_stats = product_stats.sort_values('sales_volume_numeric', ascending=False)
        
        self.product_metrics = product_stats
        return self.product_metrics
    
    def create_executive_summary(self):
        """Create executive summary with category breakdown"""
        # Category breakdown analysis
        category_counts = self.df['category'].value_counts()
        
        fig = px.pie(
            values=category_counts.values,
            names=category_counts.index,
            title='Product Distribution: Dimmers vs Light Switches',
            color_discrete_sequence=['#FF6B6B', '#4ECDC4']
        )
        
        # Add summary statistics as annotations
        total_products = len(self.df)
        total_volume = self.df['sales_volume_numeric'].sum()
        avg_price = self.df['price_usd'].mean()
        
        fig.add_annotation(
            text=f"Total: {total_products:,} products<br>Volume: {total_volume:,}<br>Avg Price: ${avg_price:.2f}",
            x=0.02, y=0.98,
            xref="paper", yref="paper",
            showarrow=False,
            align="left",
            bgcolor="rgba(255,255,255,0.8)",
            bordercolor="black",
            borderwidth=1
        )
        
        self.figures['executive_summary'] = fig
        return fig
    
    def create_brand_analysis(self):
        """Create brand analysis visualizations with category separation"""
        # Get centralized brand colors
        brand_colors, top_brands = self.get_brand_colors()
        
        # Calculate brand metrics by category
        brand_category_stats = []
        for brand in self.brand_metrics['brand'].head(10):  # Top 10 brands only
            brand_data = self.df[self.df['brand'] == brand]
            for category in brand_data['category'].unique():
                cat_data = brand_data[brand_data['category'] == category]
                if len(cat_data) > 0:
                    # Calculate total revenue for this brand-category combination
                    total_revenue = (cat_data['sales_volume_numeric'] * cat_data['price_usd']).sum()
                    brand_category_stats.append({
                        'brand': brand,
                        'category': category,
                        'revenue': total_revenue,
                        'volume': cat_data['sales_volume_numeric'].sum(),
                        'product_count': len(cat_data),
                        'avg_price_usd': cat_data['price_usd'].mean(),
                        'avg_list_price_usd': cat_data['unit_price'].mean()
                    })
        
        brand_cat_df = pd.DataFrame(brand_category_stats)
        
        # Stacked bar chart: Brand revenue by category
        fig1 = px.bar(
            brand_cat_df,
            x='brand',
            y='revenue',
            color='category',
            labels={'revenue': 'Total Revenue ($)', 'brand': 'Brand'},
            color_discrete_map={'Dimmer Switches': '#FF6B6B', 'Light Switches': '#4ECDC4'}
        )
        
        # Create styled brand names with background colors
        styled_brand_names = []
        for brand in brand_cat_df['brand'].unique():
            brand_display = brand if brand in top_brands else 'Other'
            bg_color = brand_colors.get(brand_display, '#D3D3D3')
            # Use white text on dark backgrounds, black on light backgrounds
            text_color = '#FFFFFF' if bg_color in ['#FF6B6B', '#4ECDC4'] else '#000000'
            styled_name = f'<span style="background-color: {bg_color}; color: {text_color}; padding: 2px 6px; border-radius: 3px; font-weight: bold;">{brand}</span>'
            styled_brand_names.append(styled_name)
        
        fig1.update_layout(
            xaxis_tickangle=-45,
            xaxis=dict(
                tickfont=dict(size=10)
            )
        )
        
        # Update individual tick labels with styled names
        fig1.update_xaxes(
            ticktext=styled_brand_names,
            tickvals=list(range(len(brand_cat_df['brand'].unique())))
        )
        
        # Brand Revenue and Price Comparison with Box Plots
        # Create brand-based box plots showing price distribution for each brand
        
        # Get top brands for analysis
        positioning_data = []
        for category in self.df['category'].unique():
            cat_data = self.df[self.df['category'] == category]
            for brand in cat_data['brand'].unique():
                brand_data = cat_data[cat_data['brand'] == brand]
                if len(brand_data) >= 2:  # Only include brands with at least 2 products for meaningful box plots
                    brand_display = brand if brand in top_brands else 'Other'
                    positioning_data.append({
                        'category': category,
                        'brand': brand,
                        'brand_display': brand_display,
                        'price_usd': brand_data['price_usd'].tolist(),
                        'unit_price': brand_data['unit_price'].tolist(),
                        'product_count': len(brand_data),
                        'total_revenue': (brand_data['sales_volume_numeric'] * brand_data['price_usd']).sum()
                    })
        
        
        
        self.figures['brand_category_volume'] = fig1
        
        return fig1
    
    def create_product_analysis(self):
        """Create product analysis with category separation and brand coloring"""
        # Get centralized brand colors
        brand_colors, top_brands = self.get_brand_colors()
        
        # Top products by category (filter out zero sales, then get top 20 by revenue)
        dimmers_with_sales = self.df[(self.df['category'] == 'Dimmer Switches') & (self.df['sales_volume_numeric'] > 0)]
        switches_with_sales = self.df[(self.df['category'] == 'Light Switches') & (self.df['sales_volume_numeric'] > 0)]
        
        # Calculate revenue for selection
        dimmers_with_sales = dimmers_with_sales.copy()
        switches_with_sales = switches_with_sales.copy()
        dimmers_with_sales['revenue'] = dimmers_with_sales['sales_volume_numeric'] * dimmers_with_sales['price_usd']
        switches_with_sales['revenue'] = switches_with_sales['sales_volume_numeric'] * switches_with_sales['price_usd']
        
        top_dimmers = dimmers_with_sales.nlargest(20, 'revenue')
        top_switches = switches_with_sales.nlargest(20, 'revenue')
        
        # Combine and truncate names
        name_col = 'title' if 'title' in self.df.columns else 'brand'
        
        # Prepare data for both categories
        combined_top = []
        display_name_counter = {}  # Track duplicate display names
        
        for category, data in [('Top 20 Dimmers', top_dimmers), ('Top 20 Light Switches', top_switches)]:
            # Don't sort here - we'll sort in the subplot creation based on the selected metric
            
            for idx, row in data.iterrows():
                display_name = row[name_col]
                if isinstance(display_name, str) and len(display_name) > 50:
                    display_name = display_name[:50] + '...'
                
                # Ensure unique display names by adding a suffix if duplicates exist
                original_display_name = display_name
                if display_name in display_name_counter:
                    display_name_counter[display_name] += 1
                    display_name = f"{original_display_name} ({display_name_counter[display_name]})"
                else:
                    display_name_counter[display_name] = 1
                
                brand = row['brand'] if row['brand'] in top_brands else 'Other'
                product_url = row.get('product_url', '') if 'product_url' in row else ''
                
                # Use pre-calculated revenue (or calculate if not present)
                revenue = row.get('revenue', row['sales_volume_numeric'] * row['price_usd'])
                
                combined_top.append({
                    'category_type': category,
                    'display_name': display_name,
                    'brand': brand,
                    'sales_volume_numeric': row['sales_volume_numeric'],
                    'revenue': revenue,
                    'price_usd': row['price_usd'],
                    'product_url': product_url,
                    'full_title': row[name_col]
                })
        
        combined_df = pd.DataFrame(combined_top)
        
        
        # Create subplots for categories
        fig1_subplot = make_subplots(
            rows=2, cols=1,
            subplot_titles=('🔆 Top 20 Dimmer Switches (by Total Revenue)', '💡 Top 20 Light Switches (by Total Revenue)'),
            vertical_spacing=0.15,
            specs=[[{"type": "bar"}], [{"type": "bar"}]]
        )
        
        # Add data to subplots with proper ranking order - only revenue
        for i, category in enumerate(['Top 20 Dimmers', 'Top 20 Light Switches']):
            cat_data = combined_df[combined_df['category_type'] == category]
            # Sort by revenue in descending order so largest values appear at top
            cat_data = cat_data.sort_values('revenue', ascending=True).reset_index(drop=True)
            
            # Helper function to wrap text
            def wrap_text(text, max_length=50):
                if len(str(text)) <= max_length:
                    return str(text)
                words = str(text).split()
                lines = []
                current_line = []
                current_length = 0
                
                for word in words:
                    if current_length + len(word) + 1 <= max_length:
                        current_line.append(word)
                        current_length += len(word) + 1
                    else:
                        if current_line:
                            lines.append(' '.join(current_line))
                        current_line = [word]
                        current_length = len(word)
                
                if current_line:
                    lines.append(' '.join(current_line))
                
                return '<br>'.join(lines)
            
            # Prepare data for all products in ranking order
            x_values = []
            y_labels = []
            y_display = []
            colors = []
            brands_for_legend = []
            hover_data = []
            
            for idx, row in cat_data.iterrows():
                x_values.append(row['revenue'])
                
                # Create clickable y-axis label
                if row['product_url']:
                    y_label = f'<a href="{row["product_url"]}" target="_blank" style="color: black; text-decoration: none;">{row["display_name"]}</a>'
                else:
                    y_label = row['display_name']
                y_labels.append(y_label)
                y_display.append(row['display_name'])
                
                # Color by brand
                brand = row['brand']
                colors.append(brand_colors.get(brand, '#D3D3D3'))
                brands_for_legend.append(brand)
                
                # Prepare hover data without link
                title_wrapped = wrap_text(row['full_title'], 40)
                hover_data.append([title_wrapped, row['price_usd'], brand])
            
            # Add single trace with all bars in correct order
            fig1_subplot.add_trace(
                go.Bar(
                    x=x_values,
                    y=y_display,  # Use simple names for plotly
                    orientation='h',
                    marker_color=colors,
                    visible=True,
                    showlegend=False,  # We'll handle legend separately
                    hovertemplate='<b style="width:250px;display:inline-block;">%{customdata[0]}</b><br>' +
                                 '<span style="width:250px;display:inline-block;">Brand: %{customdata[2]}</span><br>' +
                                 '<span style="width:250px;display:inline-block;">Revenue: $%{x:,.0f}</span><br>' +
                                 '<span style="width:250px;display:inline-block;">Price: $%{customdata[1]:.2f}</span><br>' +
                                 '<extra></extra>',
                    customdata=hover_data
                ),
                row=i+1, col=1
            )
            
            # Add invisible traces for legend (only for first subplot) - show all top brands
            if i == 0:
                for brand in top_brands + ['Other']:
                    fig1_subplot.add_trace(
                        go.Bar(
                            x=[0],
                            y=[''],
                            marker_color=brand_colors.get(brand, '#D3D3D3'),
                            name=brand,
                            showlegend=True,
                            visible=False  # Invisible, just for legend
                        ),
                        row=1, col=1
                    )
        
        fig1 = fig1_subplot
        
        # Update layout - no toggle needed, only revenue
        fig1.update_layout(
            height=800,
            showlegend=True,
            legend=dict(
                orientation="v", 
                yanchor="top", 
                y=1, 
                xanchor="left", 
                x=1.02,
                title="Brands"
            ),
            hoverlabel=dict(
                bgcolor="white",
                bordercolor="black",
                font_size=12,
                font_family="Arial"
            )
        )
        
        # Update axis labels and make y-axis clickable
        fig1.update_xaxes(title_text="Total Revenue ($)")
        fig1.update_yaxes(title_text="Product (Click to View)")
        
        # Update y-axis to allow clickable labels
        for i in range(1, 3):  # Two subplots
            category = 'Top 20 Dimmers' if i == 1 else 'Top 20 Light Switches'
            cat_data = combined_df[combined_df['category_type'] == category]
            cat_data = cat_data.sort_values('revenue', ascending=False)
            
            # Create clickable y-axis labels
            clickable_labels = []
            for _, row in cat_data.iterrows():
                if row['product_url']:
                    label = f'<a href="{row["product_url"]}" target="_blank" style="color: #333; text-decoration: underline;">{row["display_name"]}</a>'
                else:
                    label = row['display_name']
                clickable_labels.append(label)
            
            fig1.update_yaxes(
                ticktext=clickable_labels,
                tickvals=cat_data['display_name'].tolist(),
                row=i, col=1
            )
        
        # Price vs Revenue chart with separate subplots for each category
        fig2 = make_subplots(
            rows=2, cols=1,
            subplot_titles=('🔆 Dimmer Switches - Price vs Revenue', '💡 Light Switches - Price vs Revenue'),
            vertical_spacing=0.15,
            specs=[[{"type": "scatter"}], [{"type": "scatter"}]]
        )
        
        # Calculate revenue for each product
        self.df['revenue'] = self.df['sales_volume_numeric'] * self.df['price_usd']
        self.df['unit_revenue'] = self.df['sales_volume_numeric'] * self.df['unit_price']
        
        # Add traces for both price types with brand coloring - show only top 20 products by revenue per category
        for price_label, price_col, revenue_col in [('SKU Price', 'price_usd', 'revenue'), ('Unit Price', 'unit_price', 'unit_revenue')]:
            visible = (price_label == 'SKU Price')
            
            for i, category in enumerate(['Dimmer Switches', 'Light Switches']):
                cat_data = self.df[self.df['category'] == category]
                
                # Filter to top 20 products by revenue for this category
                cat_data = cat_data.nlargest(20, revenue_col)
                
                # Create brand colors for this category's data
                cat_data_with_brand_display = cat_data.copy()
                cat_data_with_brand_display['brand_display'] = cat_data_with_brand_display['brand'].apply(
                    lambda x: x if x in top_brands else 'Other'
                )
                cat_data_with_brand_display['color'] = cat_data_with_brand_display['brand_display'].map(brand_colors)
                
                # Ensure product_url column exists and handle missing URLs
                if 'product_url' not in cat_data_with_brand_display.columns:
                    cat_data_with_brand_display['product_url'] = ''
                cat_data_with_brand_display['product_url'] = cat_data_with_brand_display['product_url'].fillna('')
                
                fig2.add_trace(
                    go.Scatter(
                        x=cat_data_with_brand_display[price_col],
                        y=cat_data_with_brand_display[revenue_col],
                        mode='markers',
                        name=f'{category}',
                        marker=dict(
                            color=cat_data_with_brand_display['color'],
                            opacity=0.7, 
                            size=12,
                            line=dict(width=1, color='white')
                        ),
                        visible=visible,
                        showlegend=False,  # We'll add brand legends separately
                        hovertemplate='<b style="width:250px;display:inline-block;">%{customdata[1]}</b><br>' +
                                     '<span style="width:250px;display:inline-block;">Brand: %{customdata[0]}</span><br>' +
                                     '<span style="width:250px;display:inline-block;">Category: %{customdata[2]}</span><br>' +
                                     f'<span style="width:250px;display:inline-block;">{price_label}: $%{{x:.2f}}</span><br>' +
                                     '<span style="width:250px;display:inline-block;">Revenue: $%{y:,.0f}</span><br>' +
                                     '<span style="width:250px;display:inline-block;">Volume: %{customdata[3]:,.0f}</span><br>' +
                                     '<b style="width:250px;display:inline-block;">💡 Click dot to view product</b><br>' +
                                     '<extra></extra>',
                        customdata=cat_data_with_brand_display[['brand', 'title', 'category', 'sales_volume_numeric', 'product_url']].values
                    ),
                    row=i+1, col=1
                )
            
            # Add brand legend traces (invisible, just for legend)
            if visible:  # Only add legend for the visible price type
                for brand in top_brands + ['Other']:
                    fig2.add_trace(
                        go.Scatter(
                            x=[None],
                            y=[None],
                            mode='markers',
                            marker=dict(
                                color=brand_colors[brand],
                                size=10,
                                line=dict(width=1, color='white')
                            ),
                            name=brand,
                            showlegend=True,
                            visible=visible,
                            hoverinfo='skip'
                        ),
                        row=1, col=1
                    )
        
        fig2.update_layout(
            height=600,
            title={
                'text': "Top 20 Products by Revenue: Price vs Revenue Analysis",
                'x': 0.5,
                'xanchor': 'center',
                'font': {'size': 16, 'color': '#2c3e50'}
            },
            annotations=[
                dict(
                    text="🔆 Dimmer Switches - Price vs Revenue",
                    x=0.5, y=0.95,
                    xref="paper", yref="paper",
                    showarrow=False,
                    font=dict(size=14, color="black", family="Arial Black"),
                    xanchor="center"
                ),
                dict(
                    text="💡 Light Switches - Price vs Revenue",
                    x=0.5, y=0.48,
                    xref="paper", yref="paper",
                    showarrow=False,
                    font=dict(size=14, color="black", family="Arial Black"),
                    xanchor="center"
                ),
                dict(
                    text="Price Type:",
                    x=0, y=1.08,
                    xref="paper", yref="paper",
                    showarrow=False,
                    font=dict(size=12, color="black")
                )
            ],
            updatemenus=[
                dict(
                    type="dropdown",
                    direction="down",
                    showactive=True,
                    x=0.18, y=1.11,
                    xanchor="center",
                    buttons=list([
                        dict(label="SKU Price (Selling Price)",
                             method="update",
                             args=[{"visible": [True if i < 2*len(top_brands+['Other'])+2 else False for i in range(len(fig2.data))]}]),
                        dict(label="Unit Price (List Price)", 
                             method="update",
                             args=[{"visible": [True if i >= 2*len(top_brands+['Other'])+2 else False for i in range(len(fig2.data))]}])
                    ]),
                )
            ],
            legend=dict(
                orientation="v", 
                yanchor="top", 
                y=1, 
                xanchor="left", 
                x=1.02,
                title="Brands"
            ),
            hoverlabel=dict(
                bgcolor="white",
                bordercolor="black",
                font_size=12,
                font_family="Arial"
            )
        )
        
        # Update axis labels
        fig2.update_xaxes(title_text="Price (USD)", row=1, col=1)
        fig2.update_xaxes(title_text="Price (USD)", row=2, col=1)
        fig2.update_yaxes(title_text="Revenue ($)", row=1, col=1)
        fig2.update_yaxes(title_text="Revenue ($)", row=2, col=1)
        
        self.figures['top_products_by_category'] = fig1
        self.figures['price_vs_volume_by_category'] = fig2
        
        return fig1, fig2
    

    
    def create_pricing_analysis(self):
        """Create pricing analysis with category comparison and price toggle"""
        # Get centralized brand colors
        brand_colors, top_brands = self.get_brand_colors()
        
        # Price distribution by category with toggle (removed box plots)
        fig1 = go.Figure()
        
        # Add traces for both price types
        for price_type, price_col in [('SKU', 'price_usd'), ('Unit', 'unit_price')]:
            visible = price_type == 'SKU'  # SKU price visible by default
            
            # Calculate statistics for annotations
            stats_text = []
            
            for i, category in enumerate(self.df['category'].unique()):
                cat_data = self.df[self.df['category'] == category]
                color = '#FF6B6B' if 'Dimmer' in category else '#4ECDC4'
                
                # Calculate statistics
                stats = {
                    'min': cat_data[price_col].min(),
                    'max': cat_data[price_col].max(),
                    'mean': cat_data[price_col].mean(),
                    'median': cat_data[price_col].median(),
                    'q1': cat_data[price_col].quantile(0.25),
                    'q3': cat_data[price_col].quantile(0.75)
                }
                
                fig1.add_trace(go.Violin(
                    y=cat_data[price_col],
                    name=f'{category}',
                    box_visible=False,  # Removed box plots
                    meanline_visible=True,
                    fillcolor=color,
                    x0=category,
                    opacity=0.7,
                    visible=visible,
                    showlegend=visible,
                    hovertemplate=f'${price_type} Price: $%{{y:.2f}}<extra></extra>'
                ))
                
                # Prepare statistics text
                if visible:  # Only add stats for visible traces
                    stats_text.append(f"{category} ({price_type} Price):<br>" +
                                    f"Min: ${stats['min']:.2f}<br>" +
                                    f"Q1: ${stats['q1']:.2f}<br>" +
                                    f"Median: ${stats['median']:.2f}<br>" +
                                    f"Mean: ${stats['mean']:.2f}<br>" +
                                    f"Q3: ${stats['q3']:.2f}<br>" +
                                    f"Max: ${stats['max']:.2f}")
        
        fig1.update_layout(
            yaxis_title='Price (USD)',
            xaxis_title='Category',
            annotations=[
                dict(
                    text="Price Type:",
                    x=0, y=1.12,
                    xref="paper", yref="paper",
                    showarrow=False,
                    font=dict(size=12, color="black")
                )
            ],
            updatemenus=[
                dict(
                    type="dropdown",
                    direction="down",
                    showactive=True,
                    x=0.18, y=1.15,
                    xanchor="center",
                    buttons=list([
                        dict(label="SKU Price (Selling Price)",
                             method="update",
                             args=[{"visible": [True if i < len(self.df['category'].unique()) else False for i in range(len(fig1.data))]}]),
                        dict(label="Unit Price (List Price)", 
                             method="update",
                             args=[{"visible": [True if i >= len(self.df['category'].unique()) else False for i in range(len(fig1.data))]}])
                    ]),
                )
            ]
        )
        
        # Add initial statistics annotation (will update with dropdown)
        initial_stats = []
        for category in self.df['category'].unique():
            cat_data = self.df[self.df['category'] == category]
            stats = {
                'min': cat_data['price_usd'].min(),
                'max': cat_data['price_usd'].max(),
                'mean': cat_data['price_usd'].mean(),
                'median': cat_data['price_usd'].median(),
                'q1': cat_data['price_usd'].quantile(0.25),
                'q3': cat_data['price_usd'].quantile(0.75)
            }
            initial_stats.append(f"{category} (SKU Price):<br>" +
                               f"Min: ${stats['min']:.2f}<br>" +
                               f"Q1: ${stats['q1']:.2f}<br>" +
                               f"Median: ${stats['median']:.2f}<br>" +
                               f"Mean: ${stats['mean']:.2f}<br>" +
                               f"Q3: ${stats['q3']:.2f}<br>" +
                               f"Max: ${stats['max']:.2f}")
        
        fig1.add_annotation(
            text="<br><br>".join(initial_stats),
            x=1.02, y=1,
            xref="paper", yref="paper",
            showarrow=False,
            align="left",
            bgcolor="rgba(255,255,255,0.9)",
            bordercolor="black",
            borderwidth=1,
            font=dict(size=10)
        )
        
        # Create brand price distribution plots for each category
        fig2 = make_subplots(
            rows=2, cols=1,
            subplot_titles=('🔆 Price Distribution by Brand - Dimmer Switches', '💡 Price Distribution by Brand - Light Switches'),
            vertical_spacing=0.2,
            specs=[[{"type": "violin"}], [{"type": "violin"}]]
        )
        
        # Add price distribution by brand for each category
        categories = self.df['category'].unique()
        
        for i, category in enumerate(categories):
            cat_data = self.df[self.df['category'] == category]
            
            # Get top brands for this category (minimum 3 products to show meaningful distribution)
            brand_counts = cat_data['brand'].value_counts()
            eligible_brands = brand_counts[brand_counts >= 3].index.tolist()[:8]  # Top 8 brands with at least 3 products
            
            for brand in eligible_brands:
                brand_data = cat_data[cat_data['brand'] == brand]
                brand_display = brand if brand in top_brands else 'Other'
                
                # Add violin for SKU price
                fig2.add_trace(
                    go.Violin(
                        y=brand_data['price_usd'],
                        name=brand,
                        x0=brand,
                        box_visible=False,
                        meanline_visible=True,
                        fillcolor=brand_colors.get(brand_display, '#D3D3D3'),
                        opacity=0.7,
                        visible=True,
                        showlegend=(i == 0),  # Only show legend for first subplot
                        hovertemplate=f'<b>{brand}</b><br>' +
                                     f'SKU Price: $%{{y:.2f}}<extra></extra>'
                    ),
                    row=i+1, col=1
                )
                
                # Add violin for Unit price (initially hidden)
                fig2.add_trace(
                    go.Violin(
                        y=brand_data['unit_price'],
                        name=f'{brand} (Unit)',
                        x0=brand,
                        box_visible=False,
                        meanline_visible=True,
                        fillcolor=brand_colors.get(brand_display, '#D3D3D3'),
                        opacity=0.7,
                        visible=False,
                        showlegend=False,
                        hovertemplate=f'<b>{brand}</b><br>' +
                                     f'Unit Price: $%{{y:.2f}}<extra></extra>'
                    ),
                    row=i+1, col=1
                )
        
        # Calculate visibility arrays for dropdown
        num_categories = len(categories)
        num_brands_per_category = []
        
        for category in categories:
            cat_data = self.df[self.df['category'] == category]
            brand_counts = cat_data['brand'].value_counts()
            eligible_brands = brand_counts[brand_counts >= 3].index.tolist()[:8]
            num_brands_per_category.append(len(eligible_brands))
        
        total_traces = sum(num_brands_per_category) * 2  # 2 price types per brand
        
        # SKU price visibility: first trace for each brand
        sku_visibility = []
        unit_visibility = []
        
        trace_idx = 0
        for cat_idx in range(num_categories):
            for brand_idx in range(num_brands_per_category[cat_idx]):
                sku_visibility.extend([True, False])  # SKU visible, Unit hidden
                unit_visibility.extend([False, True])  # SKU hidden, Unit visible
                trace_idx += 2
        
        fig2.update_layout(
            height=800,
            title={
                'text': "Price Distribution by Brand (Top Brands with 3+ Products)",
                'x': 0.5,
                'xanchor': 'center'
            },
            annotations=[
                dict(
                    text="🔆 Price Distribution by Brand - Dimmer Switches",
                    x=0.5, y=0.95,
                    xref="paper", yref="paper",
                    showarrow=False,
                    font=dict(size=14, color="black", family="Arial Black"),
                    xanchor="center"
                ),
                dict(
                    text="💡 Price Distribution by Brand - Light Switches",
                    x=0.5, y=0.48,
                    xref="paper", yref="paper",
                    showarrow=False,
                    font=dict(size=14, color="black", family="Arial Black"),
                    xanchor="center"
                ),
                dict(
                    text="Price Type:",
                    x=0, y=1.05,
                    xref="paper", yref="paper",
                    showarrow=False,
                    font=dict(size=12, color="black")
                )
            ],
            updatemenus=[
                dict(
                    type="dropdown",
                    direction="down",
                    showactive=True,
                    x=0.18, y=1.08,
                    xanchor="center",
                    buttons=list([
                        dict(label="SKU Price (Selling Price)",
                             method="update",
                             args=[{"visible": sku_visibility}]),
                        dict(label="Unit Price (List Price)", 
                             method="update",
                             args=[{"visible": unit_visibility}])
                    ]),
                )
            ],
            legend=dict(
                orientation="v", 
                yanchor="top", 
                y=1, 
                xanchor="left", 
                x=1.02,
                title="Brands"
            )
        )
        
        # Update axis labels
        fig2.update_xaxes(title_text="Brand", row=1, col=1)
        fig2.update_xaxes(title_text="Brand", row=2, col=1)
        fig2.update_yaxes(title_text="Price (USD)", row=1, col=1)
        fig2.update_yaxes(title_text="Price (USD)", row=2, col=1)
        
        self.figures['price_distribution_by_category'] = fig1
        self.figures['brand_price_distribution'] = fig2
        
        return fig1, fig2
    

    
    def create_market_insights(self):
        """Create market insights with category and smart/traditional analysis"""
        # Smart vs Traditional by Category
        category_smart_data = []
        for category in self.df['category'].unique():
            cat_data = self.df[self.df['category'] == category]
            for product_type in ['Smart', 'Traditional']:
                type_data = cat_data[cat_data['product_type'] == product_type]
                if len(type_data) > 0:
                    # Calculate total revenue (sales volume * price)
                    total_revenue = (type_data['sales_volume_numeric'] * type_data['price_usd']).sum()
                    category_smart_data.append({
                        'category': category,
                        'product_type': product_type,
                        'product_count': len(type_data),
                        'avg_volume': type_data['sales_volume_numeric'].mean(),
                        'avg_price': type_data['price_usd'].mean(),
                        'total_volume': type_data['sales_volume_numeric'].sum(),
                        'total_revenue': total_revenue
                    })
        
        cat_smart_df = pd.DataFrame(category_smart_data)
        
        # Grouped bar chart: Smart vs Traditional by Category (using revenue)
        fig1 = px.bar(
            cat_smart_df,
            x='category',
            y='total_revenue',
            color='product_type',
            title='Smart vs Traditional Products by Category (Total Revenue)',
            labels={'total_revenue': 'Total Sales Revenue ($)', 'category': 'Category'},
            color_discrete_map={'Smart': '#3498DB', 'Traditional': '#95A5A6'},
            barmode='group'
        )
        
        self.figures['smart_vs_traditional_by_category'] = fig1
        
        return fig1
    
    def generate_html_report(self, output_path='competitor_report.html'):
        """Generate comprehensive HTML report"""
        # Ensure all analyses are run
        if self.df is None:
            raise ValueError("No data loaded. Run data_loader() first.")
        
        if self.category_stats is None:
            self.calculate_category_stats()
        
        if self.brand_metrics is None:
            self.brand_analyzer()
        
        if self.product_metrics is None:
            self.product_analyzer()
        
        # Create all visualizations
        self.create_executive_summary()
        self.create_brand_analysis()
        self.create_product_analysis()
        self.create_pricing_analysis()

        self.create_market_insights()
        
        # Generate HTML content
        html_content = self._generate_html_content()
        
        # Write to file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"HTML report generated: {output_path}")
        return output_path
    
    def _generate_html_content(self):
        """Generate HTML content for the report"""
        # Convert all plotly figures to HTML
        figures_html = {}
        for name, fig in self.figures.items():
            figures_html[name] = fig.to_html(include_plotlyjs=False, div_id=name)
        
        # Create summary metrics
        top_brand = self.brand_metrics.iloc[0] if len(self.brand_metrics) > 0 else None
        
        html_template = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Amazon Dimmers & Light Switches - Competitor Analysis Report</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #2c3e50;
            text-align: center;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }}
        h2 {{
            color: #34495e;
            margin-top: 40px;
            border-left: 4px solid #3498db;
            padding-left: 15px;
        }}
        .metric-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }}
        .metric-card {{
            background: #ecf0f1;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }}
        .metric-value {{
            font-size: 2em;
            font-weight: bold;
            color: #2980b9;
        }}
        .metric-label {{
            color: #7f8c8d;
            margin-top: 5px;
        }}
        .chart-container {{
            margin: 30px 0;
            padding: 20px;
            background: #fafafa;
            border-radius: 8px;
        }}
        .plotly-hover-text {{
            width: 250px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }}
        .js-plotly-plot .plotly .scatterlayer .trace .points path {{
            cursor: pointer !important;
        }}
        .js-plotly-plot .plotly .scatterlayer .trace .points path:hover {{
            stroke-width: 2px !important;
            filter: brightness(1.2) !important;
        }}
        .insight-box {{
            background: #e8f6f3;
            border-left: 4px solid #16a085;
            padding: 15px;
            margin: 20px 0;
        }}
        .date-generated {{
            text-align: center;
            color: #95a5a6;
            font-style: italic;
            margin-top: 30px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Amazon Dimmers & Light Switches<br>Competitor Analysis Report</h1>
        
        <div class="date-generated">
            Report Generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
        </div>
        
        <h2>📊 Executive Summary</h2>
        <div class="metric-grid">
            <div class="metric-card">
                <div class="metric-value">{self.category_stats['total_products']:,}</div>
                <div class="metric-label">Total Products</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">{self.category_stats['total_volume']:,}</div>
                <div class="metric-label">Total Sales Volume</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${self.category_stats['avg_price']:.2f}</div>
                <div class="metric-label">Average Price</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">{self.category_stats['total_brands']}</div>
                <div class="metric-label">Total Brands</div>
            </div>
        </div>
        
        <div class="insight-box">
            <strong>Key Insight:</strong> 
            {f"The market leader is {top_brand['brand']} with {top_brand['market_share_volume']:.2f}% market share and {top_brand['product_count']} products." if top_brand is not None else "Market analysis shows diverse competition across multiple brands."}
        </div>
        
        <div class="chart-container">
            {figures_html['executive_summary']}
        </div>
        
        <h2>🏢 Brand Analysis</h2>
        
        <h3>Brand Revenue by Category (Dimmers vs Switches)</h3>
        <div class="chart-container">
            {figures_html['brand_category_volume']}
        </div>
    
        
        <h2>📦 Product Analysis</h2>
        <h3>Top 20 Products by Revenue (Price vs Revenue by Category)</h3>
        <div class="chart-container">
            {figures_html['price_vs_volume_by_category']}
            <script>
                // Add click handler for price vs volume scatter plot
                setTimeout(function() {{
                    var priceVolumeDiv = document.getElementById('price_vs_volume_by_category');
                    if (priceVolumeDiv && priceVolumeDiv.on) {{
                        priceVolumeDiv.on('plotly_click', function(data) {{
                            if (data.points && data.points[0] && data.points[0].customdata) {{
                                var productUrl = data.points[0].customdata[4]; // product_url is at index 4
                                if (productUrl && productUrl.trim() !== '') {{
                                    window.open(productUrl, '_blank');
                                }}
                            }}
                        }});
                    }}
                }}, 500);
            </script>
        </div>
        <h3>Top Products by Category</h3>
        <div class="chart-container">
            {figures_html['top_products_by_category']}
        </div>
        

        
        <h2>💰 Pricing Analysis</h2>
        
        <h3>Price Distribution: Dimmers vs Switches</h3>
        <div class="chart-container">
            {figures_html['price_distribution_by_category']}
        </div>
        
        <h3>Brand Price Distribution by Category</h3>
        <div class="chart-container">
            {figures_html['brand_price_distribution']}
        </div>
        
        <h2>💡 Market Insights</h2>
        
        <h3>Smart vs Traditional by Category</h3>
        <div class="chart-container">
            {figures_html['smart_vs_traditional_by_category']}
        </div>
        
        <h2>📈 Summary Metrics</h2>
        <div class="metric-grid">
            <div class="metric-card">
                <div class="metric-value">${self.category_stats['price_range']['min']:.2f} - ${self.category_stats['price_range']['max']:.2f}</div>
                <div class="metric-label">Price Range</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">{self.category_stats['avg_volume_per_product']:.2f}</div>
                <div class="metric-label">Avg Volume/Product</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${self.category_stats['median_price']:.2f}</div>
                <div class="metric-label">Median Price</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">{len(self.brand_metrics[self.brand_metrics['market_share_volume'] >= 5])}</div>
                <div class="metric-label">Major Brands (5%+ share)</div>
            </div>
        </div>
        
        <div class="date-generated">
            End of Report
        </div>
    </div>
</body>
</html>
        """
        
        return html_template
    
    def export_metrics_csv(self, output_dir='./'):
        """Export detailed metrics to CSV files"""
        if not output_dir.endswith('/'):
            output_dir += '/'
        
        # Brand metrics
        if self.brand_metrics is not None:
            self.brand_metrics.to_csv(f'{output_dir}brand_metrics.csv', index=False)
        
        # Product metrics
        if self.product_metrics is not None:
            self.product_metrics.to_csv(f'{output_dir}product_metrics.csv', index=False)
        
        # Category stats
        if self.category_stats is not None:
            stats_df = pd.DataFrame([self.category_stats])
            stats_df.to_csv(f'{output_dir}category_stats.csv', index=False)
        
        print(f"CSV files exported to {output_dir}")
    
    def run_full_analysis(self, df=None, output_html='competitor_report.html', export_csv=True):
        """
        Run complete analysis and generate report
        
        Args:
            df (pandas.DataFrame): Input data
            output_html (str): Output HTML file path
            export_csv (bool): Whether to export CSV files
            
        Returns:
            str: Path to generated HTML report
        """
        print("🚀 Starting Amazon Dimmers & Light Switches Analysis...")
        
        # Load and process data
        print("📊 Loading and processing data...")
        self.data_loader(df)
        
        # Calculate metrics
        print("📈 Calculating category statistics...")
        self.calculate_category_stats()
        
        print("🏢 Analyzing brand performance...")
        self.brand_analyzer()
        
        print("📦 Analyzing product performance...")
        self.product_analyzer()
        
        # Generate report
        print("📋 Generating HTML report...")
        report_path = self.generate_html_report(output_html)
        
        # Export CSV if requested
        if export_csv:
            print("💾 Exporting detailed metrics to CSV...")
            self.export_metrics_csv()
        
        print("✅ Analysis complete!")
        print(f"📄 HTML Report: {report_path}")
        
        return report_path

# Example usage function
def run_competitor_analysis(data_source, output_file='amazon_competitor_report.html'):
    """
    Convenience function to run the complete analysis
    
    Args:
        data_source: Either a file path (str) or pandas DataFrame
        output_file (str): Output HTML file name
        
    Returns:
        CompetitorReportGenerator: The analysis object with results
    """
    # Initialize analyzer
    if isinstance(data_source, str):
        analyzer = CompetitorReportGenerator(data_path=data_source)
        report_path = analyzer.run_full_analysis(output_html=output_file)
    else:
        analyzer = CompetitorReportGenerator()
        report_path = analyzer.run_full_analysis(df=data_source, output_html=output_file)
    
    return analyzer

if __name__ == "__main__":
    # Example usage - replace with your actual data source
    print("Amazon Dimmers & Light Switches Competitor Report Generator")
    print("Required columns in your data:")
    print("- source: Data source (should be 'amazon')")
    print("- brand: Brand name")
    print("- price_usd: Product price in USD")
    print("- recent_sales: Raw volume strings (e.g., '300+ bought in past month')")
    print("- title: Product name")
    print("- category: Product category")
    print("=" * 60)
    print()
    print("Running analysis on actual data...")
    run_competitor_analysis(data_source='/Users/maoc/MIT Dropbox/Chengfeng Mao/JMP/Leviton_Demo/data/processed/combined_products_20250606.csv', output_file='amazon_competitor_report.html')